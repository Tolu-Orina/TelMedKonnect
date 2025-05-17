# TELMEDKONNECT BACKEND

### AUTHENTICATION SET UP

### 2. AWS Cognito Setup Steps

**Step 1: Create User Pool**
1. Go to [AWS Cognito Console](https://console.aws.amazon.com/cognito/)
2. Choose "User Pools" > "Create user pool" - Name: TelMedkonnectUserPool
3. Select:
   - **Sign-in options**: Email
   - **Password policy**: Custom (minimum 8 characters)
   - **MFA**: Optional (recommend "No MFA")
   - **User account recovery**: Email only

**Step 2: Configure Attributes**
1. Under "Attributes":
   - Keep standard attributes: email (required)
   - Add custom attributes:
     - `custom:role` (String)
     - `custom:specialty` (String)
     - `custom:license` (String)
     - `custom:org_name` (String)

**Step 3: Set Up App Client**
1. Go to "App integration" > "App client"
2. Create new app client:
   - Name: `TelMedkonnectWebClient`
   - Uncheck "Generate client secret"
   - Auth flows: ALLOW_REFRESH_TOKEN_AUTH, ALLOW_USER_PASSWORD_AUTH
   - OAuth 2.0: Optional (enable later for social login)

**Step 4: Configure Message Templates**
1. Under "Messaging" > "Email templates":
   - Customize verification/reset emails
   - From address: Use SES verified email

**Step 5: Enable Triggers (Optional)**
1. Under "Lambda triggers":
   - "Pre Sign-up" - For validating registrations
   - "Post Confirmation" - For post-signup workflows
   - "Custom Message" - For custom email templates

**Step 6: Create Domain**
1. Under "App integration" > "Domain name":
   - Create domain (e.g., `telmedkonnect-auth`)
   - Save domain name for callback URLs

**Step 7: Environment Variables**
Add these to your Next.js `.env.local`:
```bash
NEXT_PUBLIC_AWS_REGION=your_region
NEXT_PUBLIC_USER_POOL_ID=your_pool_id
NEXT_PUBLIC_USER_POOL_CLIENT_ID=your_client_id
```

### Testing Flow Checklist
1. **Sign Up**
   ```bash
   curl -X POST --data '{
     "email": "test@example.com",
     "password": "Test1234!",
     "role": "patient"
   }' https://your-api-endpoint/signup
   ```
   
2. **Verify Email**
   - Check inbox for verification code
   - Submit code via verification screen

3. **Login**
   ```bash
   aws cognito-idp admin-initiate-auth \
     --user-pool-id YOUR_POOL_ID \
     --client-id YOUR_CLIENT_ID \
     --auth-flow ADMIN_USER_PASSWORD_AUTH \
     --auth-parameters USERNAME=test@example.com,PASSWORD=Test1234!
   ```

4. **Forgot Password**
   - Initiate from login screen
   - Check email for reset code
   - Submit new password via reset flow

### Important Notes
1. Make sure your SES email is verified for sending emails
2. Use `aws-amplify` v6+ for best TypeScript support
3. Enable CORS in API Gateway for local development
4. Initial user status after signup will be "FORCE_CHANGE_PASSWORD" until verification