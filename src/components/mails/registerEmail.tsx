import * as React from 'react';

interface EmailTemplateProps {
  username: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  username,
}) => (
<div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f4f4f5',
      color: '#1f2937',
    }}>
      <table cellPadding="0" cellSpacing="0" style={{ width: '100%' }}>
        <tr>
          <td style={{
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}>
            <table cellPadding="0" cellSpacing="0" style={{ width: '100%' }}>
              <tr>
                <td style={{ textAlign: 'center', paddingBottom: '20px' }}>
                  <span style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#ef4444',
                  }}>&lt;/&gt;</span>
                  <span style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginLeft: '8px',
                  }}>CodeMastery</span>
                </td>
              </tr>
              <tr>
                <td style={{ paddingBottom: '20px' }}>
                  <h1 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginBottom: '16px',
                  }}>Welcome to CodeMastery, {username}!</h1>
                  <p style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '16px' }}>
                    We're excited to have you join our community of passionate coders. Your journey to mastering coding skills begins now!
                  </p>
                </td>
              </tr>
              <tr>
                <td style={{ paddingBottom: '20px' }}>
                  <h2 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginBottom: '12px',
                  }}>What's Next?</h2>
                  <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                    <li style={{ marginBottom: '8px' }}>Explore our wide range of coding exercises</li>
                    <li style={{ marginBottom: '8px' }}>Set your first learning goals</li>
                    <li style={{ marginBottom: '8px' }}>Join our community forums and connect with fellow coders</li>
                    <li style={{ marginBottom: '8px' }}>Track your progress on the leaderboard</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td style={{ borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
                  <p style={{ fontSize: '14px', color: '#6b7280', textAlign: 'center' }}>
                    If you didn't create an account on CodeMastery, please ignore this email.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
);