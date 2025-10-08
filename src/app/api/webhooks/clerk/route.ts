/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { wixClientServer } from '@/lib/wixClientServer';
import { NextResponse } from 'next/server';
type UserData = {
    firstName: string;
    lastName: string;
    email_addresses: {
        email_address: string;
    }[];
}
export const POST = async (req: Request) => {
  try {
    const data  : UserData = await req.json(); 
    console.log("Received:", data);

    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    if (!data || !data.email_addresses?.[0]?.email_address) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }
  
    const wix = await wixClientServer();

    const contact = await wix.contacts.createContact({
      name: {
        first: data.firstName,
        last: data.lastName,
      },
      emails: {
        items: [
          {
            email: data.email_addresses?.[0]?.email_address,
          },
        ],
      },
    });

    return NextResponse.json({ success: true, contact });

  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
      },
      { status: 500 }
    );
  }
};
