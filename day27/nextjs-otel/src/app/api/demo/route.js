import { sleep } from '@/lib/utils';

export async function GET(req, res) {
    await sleep(5000);
    const data = 'success';
    return Response.json({ data });
}
