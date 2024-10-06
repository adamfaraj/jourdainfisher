// src/app/api/validate-password/route.js

export async function POST(request) {
  try {
    // Parse the incoming JSON request body
    const { password } = await request.json();

    // Retrieve the admin password from environment variables
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    console.log({ password, ADMIN_PASSWORD });
    // Validate the password
    if (password === ADMIN_PASSWORD) {
      // Return a success response
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      // Return an unauthorized response
      return new Response(JSON.stringify({ success: false, message: 'Invalid password' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    // Handle any unexpected errors
    return new Response(JSON.stringify({ success: false, message: 'Server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
