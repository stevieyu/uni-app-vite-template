import {collection} from "@/features/common/services/mpserverless";
import {search} from "@/features/common/services/doubanBook";

const doc = collection('Books')

export default doc

export const findISBN = async (isbn) => {
    let Book = await doc.findOne({
        isbn
    })

    if(!Book) {
        const res = (await search(isbn))[0] || null
        if(res) {
            delete res.id
            delete res.type
            res.isbn = isbn

            await doc.insertOne(res)

            Book = await doc.findOne({
                isbn
            })
        }
    }
    return Book
}

