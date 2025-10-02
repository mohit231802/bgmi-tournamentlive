import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log('Admin login attempt:', email);

    // Check environment-based admin credentials first (fallback for when database is down)
    const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD;

    console.log('Admin email from env:', adminEmail);

    if (adminEmail && adminPassword && email.toLowerCase() === adminEmail && password === adminPassword) {
      console.log('Using environment-based admin login');
      return NextResponse.json({
        success: true,
        user: {
          email: adminEmail,
          name: 'Admin Owner',
          role: 'admin',
        },
      });
    }

    // Try database authentication
    try {
      await dbConnect();
      const user = await User.findOne({ email: email.toLowerCase() });

      if (!user || !user.password) {
        return NextResponse.json(
          { success: false, error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return NextResponse.json(
          { success: false, error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      if (user.role !== 'admin') {
        return NextResponse.json(
          { success: false, error: 'Access denied. Admin only.' },
          { status: 403 }
        );
      }

      return NextResponse.json({
        success: true,
        user: {
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (dbError: any) {
      console.error('Database login failed:', dbError.message);

      // If database fails and environment credentials aren't matching, return error
      if (!adminEmail || !adminPassword || email.toLowerCase() !== adminEmail || password !== adminPassword) {
        return NextResponse.json(
          { success: false, error: 'Login failed - database unavailable' },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    );
  }
}
