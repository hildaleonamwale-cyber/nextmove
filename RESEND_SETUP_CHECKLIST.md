# 🚀 Resend Setup Checklist

Complete this checklist to activate email verification in production.

## Step 1: Get Your Resend API Key ✅

- [ ] Go to https://resend.com/login
- [ ] Sign in or create account
- [ ] Navigate to "API Keys" section
- [ ] Copy your API key (looks like: `re_xxxxxxxxxxxxxxxxxx`)
- [ ] Keep this key secure (never commit to git)

## Step 2: Add API Key to Supabase ✅

**For Production (Recommended):**

- [ ] Go to Supabase Dashboard
- [ ] Select your project
- [ ] Go to: Settings → Edge Functions → Secrets
- [ ] Click "Add Secret"
- [ ] Name: `RESEND_API_KEY`
- [ ] Value: `re_your_key_here` (paste from step 1)
- [ ] Click "Add"
- [ ] Edge functions now have access to API key

**For Local Testing (Optional):**

- [ ] Open `.env` file
- [ ] Add: `RESEND_API_KEY=re_your_key_here`
- [ ] Save file
- [ ] Don't commit to git (add to .gitignore)

## Step 3: Verify Your Domain ✅

**In Resend Dashboard:**

- [ ] Go to https://resend.com/domains
- [ ] Click "Add Domain"
- [ ] Enter: `nextmove.co.zw`
- [ ] Click "Add"

**Verify DNS Records:**

- [ ] Go to your DNS provider (where you manage nextmove.co.zw)
- [ ] Add DNS records provided by Resend:
  - [ ] MX Record
  - [ ] TXT Record
  - [ ] DKIM Record
- [ ] Wait for DNS propagation (5-30 minutes)
- [ ] Return to Resend and click "Verify Domain"
- [ ] Status should show "Verified" ✓

**If you need help with DNS:**
- Resend has setup guides for popular providers:
  - Cloudflare
  - Namecheap
  - GoDaddy
  - Google Domains
  - Route53 (AWS)
  - Check: https://resend.com/docs/domains/setup

## Step 4: Test Email Sending ✅

**In Resend Dashboard:**

- [ ] Go to "Emails" section
- [ ] Click "Send Test Email"
- [ ] Send to: your personal email
- [ ] Verify you receive it from: `Nextmove <noreply@nextmove.co.zw>`
- [ ] Check it's not in spam folder

## Step 5: Test User Signup Flow ✅

**In Your App:**

- [ ] Go to http://localhost:3000/login
- [ ] Click "Create a new account"
- [ ] Fill in:
  - Name: Test User
  - Email: your-test-email@example.com
  - Password: Test@123456
- [ ] Click "Sign Up"
- [ ] You should see OTP verification screen
- [ ] Check your email for 6-digit code
- [ ] Enter code in app
- [ ] Should redirect to dashboard

## Step 6: Monitor Email Delivery ✅

**In Resend Dashboard:**

- [ ] Go to "Emails" section
- [ ] You should see emails listed with timestamps
- [ ] Check status:
  - ✓ Delivered
  - ⏱ Processing
  - ⚠ Bounced
  - ✗ Failed

**If delivery fails:**
- [ ] Check email address is valid
- [ ] Verify domain is confirmed
- [ ] Check API key is correct
- [ ] Check Supabase function logs

## Step 7: Production Verification ✅

Before going live, test all scenarios:

- [ ] ✅ Valid signup → email received → OTP accepted
- [ ] ✅ Invalid OTP → error shown → retry works
- [ ] ✅ Expired OTP → error shown → resend works
- [ ] ✅ Too many attempts → error shown → resend works
- [ ] ✅ Email domain verified → "Nextmove" displays in inbox

## Troubleshooting

### Email not received?
```
1. Check Resend activity log for errors
2. Verify domain is confirmed in Resend
3. Check email isn't in spam
4. Try with different email address
5. Check function logs in Supabase
```

### Domain verification failing?
```
1. Ensure DNS records are exactly as shown
2. Wait 10-15 minutes for propagation
3. Use MX lookup tool to verify:
   https://mxlookup.com/
4. Contact your DNS provider support
```

### API key errors?
```
1. Verify API key format (starts with re_)
2. Ensure added to correct Supabase secret
3. Redeploy functions after adding secret
4. Check function execution logs
```

### Rate limiting?
```
Resend Free: 100 emails/day
Resend Paid: Unlimited emails

If hitting limit:
1. Upgrade Resend plan
2. Reduce test/staging requests
3. Monitor actual user signups
```

## Security Checklist ✅

- [ ] API key is in Supabase secrets (not in code)
- [ ] API key is NOT in .env file committed to git
- [ ] Domain is verified with DKIM
- [ ] Using HTTPS for all API calls
- [ ] OTP expires after 10 minutes
- [ ] Rate limited to 5 failed attempts
- [ ] Error messages don't leak sensitive info

## Performance Checklist ✅

- [ ] Email sends in < 5 seconds
- [ ] OTP verification responds < 2 seconds
- [ ] Database queries use indexes
- [ ] No N+1 queries
- [ ] Edge functions use correct region

## Deployment Checklist ✅

- [ ] Resend API key added to Supabase secrets
- [ ] Domain verified in Resend
- [ ] Edge functions deployed
- [ ] Database migrations applied
- [ ] All environment variables set
- [ ] Project builds without errors
- [ ] Tests pass
- [ ] Monitoring/logging configured

## Useful Commands

```bash
# View Supabase function logs
supabase functions list

# Check function status
curl https://your-project.supabase.co/functions/v1/send-otp

# Test Resend API directly
curl https://api.resend.com/emails \
  -X POST \
  -H 'Authorization: Bearer re_your_key' \
  -H 'Content-Type: application/json' \
  -d '{
    "from": "Nextmove <noreply@nextmove.co.zw>",
    "to": "test@example.com",
    "subject": "Test",
    "html": "<p>Test email</p>"
  }'
```

## Next Steps

1. ✅ Complete all checkboxes above
2. ✅ Test production flow
3. ✅ Monitor email delivery
4. ✅ Watch user verification rates
5. ✅ Adjust email template if needed
6. ✅ Scale up as users grow

---

**When all steps are complete, your email verification system is production-ready! 🎉**

Need help? Check the complete guides:
- `EMAIL_VERIFICATION_SETUP.md` - Detailed setup guide
- `OTP_VERIFICATION_COMPLETE.md` - Complete implementation details
