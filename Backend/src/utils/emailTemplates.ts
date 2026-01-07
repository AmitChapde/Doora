const passwordResetTemplate = (name: string, resetURL: string): string => {
  return `
    <div style="font-family: Arial, sans-serif;">
      <h2>Hello ${name},</h2>
      <p>You requested a password reset.</p>
      <p>Click the button below to reset your password:</p>

      <a href="${resetURL}"
         style="
           display: inline-block;
           padding: 10px 20px;
           background-color: #4f46e5;
           color: white;
           text-decoration: none;
           border-radius: 5px;
         ">
        Reset Password
      </a>

      <p>This link will expire in 10 minutes.</p>
      <p>If you didn’t request this, please ignore this email.</p>
    </div>
  `;
};

export default passwordResetTemplate;
