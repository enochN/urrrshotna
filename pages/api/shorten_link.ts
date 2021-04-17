import {connectToDatabase} from "./_connector";

export  default async (req, res) => {
    const db = await  connectToDatabase();

    if(req.body !== '' && req.body.link !== undefined  && req.body.link !== ''){
        const entry = await db.db('links_db').collection('links_collection').insertOne({link: req.body.link});
        res.statusCode = 201;
        return res.json({short_link: `${process.env.VERCEL_URL}/r/${entry.insertedId}`})
    }

    res.statusCode = 409;
    return  res.json({error: 'no_link_found', error_description: 'No Link found'})
}