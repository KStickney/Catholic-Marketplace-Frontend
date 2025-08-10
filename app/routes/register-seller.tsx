import { json, type ActionFunctionArgs } from '@remix-run/node';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import { useState } from 'react';
import type { RegisterSellerMutation, RegisterSellerMutationVariables } from '~/generated/graphql';
import { sdk } from '~/graphqlWrapper';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const shopName = formData.get('shopName') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const emailAddress = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const variables: RegisterSellerMutationVariables = {
      input: {
        shopName,
        seller: {
          firstName,
          lastName,
          emailAddress,
          password,
        },
      },
    };
    const res = await sdk.RegisterSeller(variables);
    if (res.RegisterSeller) {
      return json({ success: true, seller: res.RegisterSeller });
    }
    return json({ error: 'Unknown error' });
  } catch (e: any) {
    return json({ error: e.message || 'Registration failed' });
  }
};

export default function RegisterSeller() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const [showToken, setShowToken] = useState(false);

  const isSuccess = actionData && 'seller' in actionData;
  const isError = actionData && 'error' in actionData;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mt-12">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Seller Account</h1>
        {isSuccess ? (
          <div className="text-center">
            <div className="text-green-700 font-semibold mb-2">Seller account created!</div>
            <div className="mb-2">Seller ID: <span className="font-mono">{actionData.seller.id}</span></div>
            <div className="mb-2">Seller Code: <span className="font-mono">{actionData.seller.code}</span></div>
            <div className="mb-2">Seller Token: <span className="font-mono break-all">{actionData.seller.token}</span></div>
            <div className="mb-2">You can now log in to your seller admin at <span className="font-mono">/admin</span> using your email and password.</div>
          </div>
        ) : (
          <Form method="post" className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="shopName">Shop Name</label>
              <input name="shopName" id="shopName" required className="w-full border rounded px-3 py-2" />
            </div>
            <div className="flex space-x-2">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1" htmlFor="firstName">First Name</label>
                <input name="firstName" id="firstName" required className="w-full border rounded px-3 py-2" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1" htmlFor="lastName">Last Name</label>
                <input name="lastName" id="lastName" required className="w-full border rounded px-3 py-2" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
              <input name="email" id="email" type="email" required className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
              <input name="password" id="password" type="password" required className="w-full border rounded px-3 py-2" />
            </div>
            {isError && <div className="text-red-600 text-sm">{actionData.error}</div>}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition"
              disabled={navigation.state === 'submitting'}
            >
              {navigation.state === 'submitting' ? 'Registering...' : 'Register Seller'}
            </button>
          </Form>
        )}
      </div>
    </div>
  );
}
