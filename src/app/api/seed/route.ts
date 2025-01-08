import { seedProd } from "../../../../prisma/seedProd";

export async function POST(): Promise<Response> {
  try {

    await seedProd();
    return Response.json({"success": true, })
    ;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}

export async function GET(): Promise<Response> {
    try {
  
      await seedProd();
      return Response.json({"success": true, })
      ;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';
      return Response.json({ error: errorMessage }, { status: 500 });
    }
  }