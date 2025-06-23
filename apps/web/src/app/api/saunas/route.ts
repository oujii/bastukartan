import { NextRequest, NextResponse } from 'next/server';
import { SaunaRepository } from '@stockholm-sauna/db';

/**
 * GET /api/saunas
 * Returns all saunas from the database
 */
export async function GET(request: NextRequest) {
  try {
    const saunaRepository = new SaunaRepository();
    const saunas = await saunaRepository.getAllSaunas();
    
    return NextResponse.json({
      success: true,
      data: saunas,
      count: saunas.length
    });
  } catch (error) {
    console.error('Error fetching saunas:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch saunas',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
