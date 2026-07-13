import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import fs from 'fs';
import path from 'path';
import { connectToDatabase } from '../../../lib/db';

const defaultItems = [
    {
        key: "entity_01",
        title: "BWorth",
        img: "/image copy.png",
        desc: "Orchestrating a systemic shift in the industrial value chain through a proprietary circular luxury ecosystem. We integrate end-to-end lifecycle management to preserve capital and environmental equity.",
        tag: "Circular Luxury",
        tagline: "Sovereign Industrial Value Chain",
        logo: "/BWORTH.jpg",
        link: "https://bworth.co.in",
        sector: "Sustainable Fashion"
    },
    {
        key: "entity_02",
        title: "Vegavruddhi",
        img: "/image copy 2.png",
        desc: "Deploying high-precision execution frameworks that bridge the divide between global strategic mandates and regional operational reality. We architect the backbone of national scale logistics.",
        tag: "Managed Sales",
        tagline: "Regional Execution Infrastructure",
        logo: "/VEGA.png",
        link: "https://vegavruddhi.com",
        sector: "Execution Architecture"
    },
    {
        key: "entity_03",
        title: "RYM Grenergy",
        img: "/image copy 4.png",
        desc: "Pioneering the next generation of energy sovereignty through advanced electrochemical storage solutions. Our vertically integrated AI-driven infrastructure ensures energy security for high-growth sectors.",
        tag: "Clean Energy",
        tagline: "Sovereign Energy Infrastructure",
        logo: "/RYM.png",
        link: "https://rymgrenergy.com/",
        sector: "Deep-Tech"
    },
    {
        key: "entity_04",
        title: "Synchronous",
        img: "/image copy 5.png",
        desc: "Synthesizing brand identity with autonomous agent intelligence to create compound ROI for institutional-grade brands. We build the digital nexus where aesthetics meet algorithmic precision.",
        tag: "Autonomous AI",
        tagline: "Institutional Brand Architecture",
        logo: "/sync.jpg",
        link: "https://www.synchronousbuilddigital.com/",
        sector: "Digital Marketing"
    }
];

function parseManifesto() {
    try {
        const filePath = path.join(process.cwd(), 'CONTENT_MANIFESTO.md');
        if (!fs.existsSync(filePath)) {
            return null;
        }

        const content = fs.readFileSync(filePath, 'utf8');
        const sections = content.split(/## Entity \d+:\s+/);
        const parsed = {};

        for (const section of sections) {
            const lines = section.split('\n');
            const title = lines[0].trim();
            if (!title || title.startsWith('#')) continue;

            let tagline = '';
            let description = '';

            const taglineMatch = section.match(/>\s*\*\*Tagline\*\*:\s*(.+)/i);
            if (taglineMatch) {
                tagline = taglineMatch[1].trim();
            }

            const subSections = section.split(/###\s+/);
            for (const sub of subSections) {
                const subLines = sub.split('\n');
                const subTitle = subLines[0].trim().toLowerCase();

                if (subTitle.includes('core proposition') ||
                    subTitle.includes('service pillars') ||
                    subTitle.includes('strategic vision') ||
                    subTitle.includes('core pillars')) {

                    const descLines = subLines.slice(1)
                        .map(l => l.trim())
                        .filter(l => l.length > 0 && !l.startsWith('#') && !l.startsWith('>'))
                        .map(l => {
                            return l
                                .replace(/^\*\s+/, '')
                                .replace(/^\d+\.\s+/, '')
                                .replace(/\*\*/g, '')
                                .trim();
                        })
                        .slice(0, 3);

                    description = descLines.join(' ');
                    break;
                }
            }

            parsed[title.toLowerCase()] = {
                title,
                tagline,
                desc: description
            };
        }
        return parsed;
    } catch (e) {
        console.error('Error parsing manifesto:', e);
        return null;
    }
}

function getMergedContent() {
    const manifestoData = parseManifesto();
    return defaultItems.map(item => {
        if (manifestoData && manifestoData[item.title.toLowerCase()]) {
            const parsed = manifestoData[item.title.toLowerCase()];
            return {
                ...item,
                tagline: parsed.tagline || item.tagline,
                desc: parsed.desc || item.desc
            };
        }
        return item;
    });
}

export async function GET() {
    try {
        const { db } = await connectToDatabase();
        const collection = db.collection('portfolio_items');

        const count = await collection.countDocuments();
        if (count === 0) {
            console.log('MongoDB collection empty. Seeding from manifesto...');
            const seedItems = getMergedContent();
            await collection.insertMany(seedItems);
        }

        const dbItems = await collection.find({}).toArray();
        const cleanDbItems = dbItems.map(({ _id, ...item }) => item);

        const orderedItems = [];

        defaultItems.forEach(defItem => {
            const match = cleanDbItems.find(dbi => dbi.key === defItem.key);
            if (match) {
                orderedItems.push(match);
            } else {
                orderedItems.push(defItem);
            }
        });

        cleanDbItems.forEach(dbi => {
            const isDefault = defaultItems.some(def => def.key === dbi.key);
            if (!isDefault) {
                orderedItems.push(dbi);
            }
        });

        return NextResponse.json({ portfolioItems: orderedItems });
    } catch (error) {
        console.error('MongoDB database query failed. Falling back to local file parser:', error);
        const portfolioItems = getMergedContent();
        return NextResponse.json({ portfolioItems });
    }
}
