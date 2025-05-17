// app/AmplifyProvider.tsx
'use client';

import { useEffect } from 'react';
import { Amplify } from 'aws-amplify'

const amplifyConfig = {
  Auth: {
    Cognito: {
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
    }
  }
}

export default function AmplifyProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    Amplify.configure(amplifyConfig);
  }, []);

  return <>{children}</>;
}
