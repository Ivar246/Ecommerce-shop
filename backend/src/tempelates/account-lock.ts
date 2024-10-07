export const accountLockMjml = `<mjml>
  <mj-body background-color="#f4f4f4">
    <mj-section background-color="#ffffff" padding="20px" border-radius="10px">
      <mj-column>
        <mj-divider border-color="#cccccc" />
        <mj-text font-size="20px" font-weight="bold" color="#333333">
          Account Locked
        </mj-text>
        <mj-text font-size="16px" color="#555555">
          Hello,
        </mj-text>
        <mj-text font-size="16px" color="#555555">
          Your account has been locked due to multiple unsuccessful login attempts. To unlock your account, please request an OTP by clicking the button below.
        </mj-text>
        <mj-button background-color="#007BFF" color="#ffffff" font-size="16px" padding="15px" border-radius="5px" href="http://localhost.com/api/auth/otp">
          Send OTP
        </mj-button>
        <mj-text font-size="16px" color="#555555">
          If you did not request this, please contact our support immediately.
        </mj-text>
        <mj-text font-size="14px" color="#888888">
          Thank you,<br />
        </mj-text>
        <mj-divider border-color="#cccccc" />
        <mj-text font-size="12px" color="#aaaaaa">
          If you're having trouble clicking the "Send OTP" button, copy and paste the following link into your browser:
        </mj-text>
        <mj-text font-size="12px" color="#007BFF">
          http://localhost:3000/api/auth/otp
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`;
