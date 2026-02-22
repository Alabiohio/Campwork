import { NextRequest, NextResponse } from 'next/server';
import { resend } from '@/lib/resend';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
    try {
        const { email, marketingConsent, privacyConsent } = await req.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
        }


        // 1. Insert into Supabase
        const { error: supabaseError } = await supabase
            .from('waitlist')
            .insert([
                {
                    email,
                    marketing_consent: marketingConsent,
                    privacy_consent: privacyConsent,
                    created_at: new Date().toISOString()
                }
            ]);

        if (supabaseError) {
            // If it's a duplicate email, we might want to handle it gracefully
            if (supabaseError.code === '23505') {
                return NextResponse.json({ error: 'You are already on the list!' }, { status: 400 });
            }
            console.error('Supabase error:', supabaseError);
            return NextResponse.json({ error: `Database error: ${supabaseError.message}. Make sure you have created the 'waitlist' table.` }, { status: 500 });
        }


        // 2. Send confirmation email via Resend
        const { data: emailData, error: emailError } = await resend.emails.send({
            from: 'notifications@notifications.campwork.site',
            to: email,
            subject: 'Welcome to the Campwork Waitlist! 🚀',
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Welcome to Campwork</title>
                </head>
                <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9f9f9; color: #1a1a1a;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f9f9f9;">
                    <tr>
                      <td align="center" style="padding: 40px 20px;">
                        <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #eef0f2;">
                          
                          <!-- Header/Logo Area -->
                          <tr>
                            <td align="center" style="padding: 40px 40px 20px 40px;">
                              <div style="font-size: 24px; font-weight: 800; letter-spacing: -0.5px; color: #A3133A; text-transform: uppercase;">
                                CAMPWORK
                              </div>
                            </td>
                          </tr>

                          <!-- Hero Section -->
                          <tr>
                            <td align="center" style="padding: 0 40px 30px 40px;">
                              <h1 style="margin: 0; font-size: 28px; font-weight: 800; line-height: 1.2; color: #111827; letter-spacing: -0.02em;">
                                Something <span style="color: #A3133A;">Extraordinary</span><br>is Coming.
                              </h1>
                            </td>
                          </tr>

                          <!-- Content Area -->
                          <tr>
                            <td style="padding: 0 40px 40px 40px;">
                              <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #4b5563;">
                                Hi there,
                              </p>
                              <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #4b5563;">
                                You've successfully joined the waitlist for Campwork! We're building the ultimate marketplace where campus talent meets real opportunity.
                              </p>
                              <p style="margin: 0 0 32px 0; font-size: 16px; line-height: 1.6; color: #4b5563;">
                                We'll notify you the moment we launch. In the meantime, follow our journey and be the first to know about early access.
                              </p>
                              
                              <!-- Social Teaser -->
                              <div style="padding: 24px; background-color: #fcf6f7; border-radius: 12px; border: 1px solid #fce7eb; text-align: center;">
                                <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #A3133A; text-transform: uppercase; letter-spacing: 0.05em;">
                                  Stay Connected
                                </p>
                                <div style="font-size: 14px; color: #6b7280;">
                                  Follow us on <a href="https://x.com/campworkapp" style="color: #A3133A; text-decoration: none; font-weight: 600;">X</a>, <a href="https://www.instagram.com/campwork.official" style="color: #A3133A; text-decoration: none; font-weight: 600;">Instagram</a>, and <a href="https://www.facebook.com/share/14XE1SvNqDt/" style="color: #A3133A; text-decoration: none; font-weight: 600;">Facebook</a>.
                                </div>
                              </div>
                            </td>
                          </tr>

                          <!-- Footer Area -->
                          <tr>
                            <td align="center" style="padding: 30px 40px; background-color: #fafafa; border-top: 1px solid #f3f4f6;">
                              <p style="margin: 0 0 8px 0; font-size: 12px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">
                                CAMPWORK
                              </p>
                              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                                &copy; ${new Date().getFullYear()} All rights reserved.
                              </p>
                            </td>
                          </tr>

                        </table>
                      </td>
                    </tr>
                  </table>
                </body>
              </html>
            `,
        });

        if (emailError) {
            console.error('Resend error:', emailError);
            // We return success: true because the user IS in the database
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Waitlist API error:', error);
        return NextResponse.json({ error: `Internal server error: ${error.message}` }, { status: 500 });
    }
}
