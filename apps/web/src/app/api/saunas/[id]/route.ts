import { NextRequest, NextResponse } from 'next/server';
import { SaunaRepository } from '@stockholm-sauna/db';

/**
 * GET /api/saunas/[id]
 * Returns a single sauna by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Sauna ID is required',
          message: 'Please provide a valid sauna ID'
        },
        { status: 400 }
      );
    }

    const saunaRepository = new SaunaRepository();
    const sauna = await saunaRepository.getSaunaById(id);
    
    if (!sauna) {
      return NextResponse.json(
        {
          success: false,
          error: 'Sauna not found',
          message: `No sauna found with ID: ${id}`
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: sauna
    });
  } catch (error) {
    console.error('Error fetching sauna:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch sauna',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
