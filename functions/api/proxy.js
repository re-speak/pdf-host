export async function onRequest(context) {
    const url = new URL(context.request.url);
    const pdfUrl = url.searchParams.get('url');

    if (!pdfUrl) {
        return new Response('Missing "url" query parameter', { status: 400 });
    }

    // Validate URL format
    let parsedUrl;
    try {
        parsedUrl = new URL(pdfUrl);
    } catch {
        return new Response('Invalid URL', { status: 400 });
    }

    // Only allow http/https
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        return new Response('Only HTTP/HTTPS URLs are supported', { status: 400 });
    }

    try {
        const response = await fetch(pdfUrl, {
            headers: {
                'Accept': 'application/pdf',
            },
        });

        if (!response.ok) {
            return new Response(`Failed to fetch PDF: ${response.status} ${response.statusText}`, {
                status: response.status,
            });
        }

        // Stream the PDF back with proper headers
        return new Response(response.body, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline',
                'Cache-Control': 'public, max-age=3600',
                'Access-Control-Allow-Origin': '*',
            },
        });
    } catch (err) {
        return new Response(`Error fetching PDF: ${err.message}`, { status: 502 });
    }
}
