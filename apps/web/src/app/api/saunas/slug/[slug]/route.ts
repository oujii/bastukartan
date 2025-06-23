import { NextRequest, NextResponse } from 'next/server';
import { SaunaRepository } from '@stockholm-sauna/db';
import { slugToSearchName } from '../../../../../lib/utils';

/**
 * GET /api/saunas/slug/[slug]
 * Returns a single sauna by slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          error: 'Sauna slug is required',
          message: 'Please provide a valid sauna slug'
        },
        { status: 400 }
      );
    }

    const saunaRepository = new SaunaRepository();
    const saunas = await saunaRepository.getAllSaunas();
    
    // Convert slug back to searchable name and find matching sauna
    const searchName = slugToSearchName(slug);
    const sauna = saunas.find(s => {
      const normalizedSaunaName = s.name.toLowerCase()
        .replace(/[åä]/g, 'a')
        .replace(/[ö]/g, 'o')
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      const normalizedSearchName = searchName.toLowerCase().trim();

      return normalizedSaunaName.includes(normalizedSearchName) ||
             normalizedSearchName.includes(normalizedSaunaName) ||
             normalizedSaunaName.split(' ').some(word => normalizedSearchName.includes(word));
    });
    
    if (!sauna) {
      return NextResponse.json(
        {
          success: false,
          error: 'Sauna not found',
          message: `No sauna found with slug: ${slug}`
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: sauna
    });
  } catch (error) {
    console.error('Error fetching sauna by slug:', error);
    
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
