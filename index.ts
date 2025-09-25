/**
 * MAJ the Author Website Backend
 * Handles newsletter subscriptions, contact forms, and data management
 */

interface Env {
  DB: D1Database;
}

interface NewsletterSubscription {
  name: string;
  email: string;
  preferences: string[];
  source?: string;
}

interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 200, headers: corsHeaders });
    }

    try {
      // Get user info from headers
      const userId = request.headers.get('X-Encrypted-Yw-ID') || 'anonymous';
      const isLogin = request.headers.get('X-Is-Login') === '1';

      // Route handling
      switch (path) {
        case '/api/newsletter/subscribe':
          if (request.method === 'POST') {
            return await handleNewsletterSubscription(request, env, userId);
          }
          break;

        case '/api/contact':
          if (request.method === 'POST') {
            return await handleContactSubmission(request, env, userId);
          }
          break;

        case '/api/admin/subscribers':
          if (request.method === 'GET') {
            return await handleGetSubscribers(request, env, userId);
          }
          break;

        case '/api/admin/contacts':
          if (request.method === 'GET') {
            return await handleGetContacts(request, env, userId);
          }
          break;

        case '/health':
          return new Response(JSON.stringify({ 
            status: 'healthy', 
            timestamp: new Date().toISOString() 
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });

        default:
          return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
      }

      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (error) {
      console.error('API Error:', error);
      return new Response(JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  },
};

async function handleNewsletterSubscription(
  request: Request, 
  env: Env, 
  userId: string
): Promise<Response> {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  try {
    const data: NewsletterSubscription = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email) {
      return new Response(JSON.stringify({ 
        error: 'Name and email are required' 
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(JSON.stringify({ 
        error: 'Invalid email format' 
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // Store preferences as JSON string
    const preferencesJson = JSON.stringify(data.preferences || []);
    const source = data.source || 'website';

    // Insert subscription (handle duplicate email)
    try {
      const stmt = env.DB.prepare(`
        INSERT INTO newsletter_subscribers (encrypted_yw_id, name, email, subscription_preferences, source)
        VALUES (?, ?, ?, ?, ?)
      `);
      
      await stmt.bind(userId, data.name, data.email, preferencesJson, source).run();
      
      return new Response(JSON.stringify({ 
        success: true,
        message: 'Successfully subscribed to newsletter!'
      }), {
        status: 200,
        headers: corsHeaders
      });

    } catch (dbError: any) {
      // Handle duplicate email
      if (dbError.message && dbError.message.includes('UNIQUE constraint failed')) {
        // Update existing subscription
        const updateStmt = env.DB.prepare(`
          UPDATE newsletter_subscribers 
          SET name = ?, subscription_preferences = ?, source = ?, is_active = 1, subscribed_at = CURRENT_TIMESTAMP
          WHERE email = ?
        `);
        
        await updateStmt.bind(data.name, preferencesJson, source, data.email).run();
        
        return new Response(JSON.stringify({ 
          success: true,
          message: 'Newsletter subscription updated!'
        }), {
          status: 200,
          headers: corsHeaders
        });
      }
      throw dbError;
    }

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process subscription',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

async function handleContactSubmission(
  request: Request, 
  env: Env, 
  userId: string
): Promise<Response> {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  try {
    const data: ContactSubmission = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return new Response(JSON.stringify({ 
        error: 'All fields (name, email, subject, message) are required' 
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(JSON.stringify({ 
        error: 'Invalid email format' 
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // Insert contact submission
    const stmt = env.DB.prepare(`
      INSERT INTO contact_submissions (encrypted_yw_id, name, email, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    await stmt.bind(userId, data.name, data.email, data.subject, data.message).run();
    
    return new Response(JSON.stringify({ 
      success: true,
      message: 'Message sent successfully! Thank you for reaching out.'
    }), {
      status: 200,
      headers: corsHeaders
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to send message',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

async function handleGetSubscribers(
  request: Request, 
  env: Env, 
  userId: string
): Promise<Response> {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  try {
    // TODO: Add admin verification here when admin functionality is needed
    // For now, return basic stats only
    
    const { results } = await env.DB.prepare(`
      SELECT 
        COUNT(*) as total_subscribers,
        COUNT(CASE WHEN is_active = 1 THEN 1 END) as active_subscribers,
        COUNT(CASE WHEN subscribed_at >= date('now', '-30 days') THEN 1 END) as recent_subscribers
      FROM newsletter_subscribers
    `).all();
    
    return new Response(JSON.stringify({ 
      success: true,
      stats: results[0]
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    console.error('Get subscribers error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch subscriber data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

async function handleGetContacts(
  request: Request, 
  env: Env, 
  userId: string
): Promise<Response> {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  try {
    // TODO: Add admin verification here when admin functionality is needed
    // For now, return basic stats only
    
    const { results } = await env.DB.prepare(`
      SELECT 
        COUNT(*) as total_messages,
        COUNT(CASE WHEN status = 'new' THEN 1 END) as unread_messages,
        COUNT(CASE WHEN submitted_at >= date('now', '-7 days') THEN 1 END) as recent_messages
      FROM contact_submissions
    `).all();
    
    return new Response(JSON.stringify({ 
      success: true,
      stats: results[0]
    }), {
      headers: corsHeaders
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch contact data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}