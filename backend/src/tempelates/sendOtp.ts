export const sendOTPMjml = `<mjml>
  <mj-body background-color="#f4f4f4">
    <mj-section background-color="#ffffff" padding="20px" border-radius="10px">
      <mj-column>
        <mj-divider border-color="#cccccc" />
        <mj-text font-size="20px" font-weight="bold" color="#333333">
          Your One-Time Password (OTP)
        </mj-text>
        <mj-text font-size="16px" color="#555555">
          Hello,
        </mj-text>
        <mj-text font-size="16px" color="#555555">
          You requested a one-time password (OTP) for your account. Please use the OTP below to proceed:
        </mj-text>
        <mj-text font-size="24px" font-weight="bold" color="#007BFF" align="center">
          123456
        </mj-text>
        <mj-text font-size="16px" color="#555555" align="center">
          This OTP is valid for 10 minutes.
        </mj-text>
        <mj-text font-size="16px" color="#555555">
          If you did not request this OTP, please ignore this email or contact our support team immediately.
        </mj-text>
        <mj-divider border-color="#cccccc" />
        <mj-text font-size="14px" color="#888888">
          Thank you,<br />
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;
