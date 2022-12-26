import {collection} from "@/features/common/services/mpserverless";
import Books from "@/NearbyBooksShare/models/Books";
import ApplyBooks from "@/NearbyBooksShare/models/ApplyBooks";

const doc = collection('UserBooks')

/**
 *
 * @param coordinates [location.longitude, location.latitude]
 * @param maxDistance 单位米
 * @param query
 * @returns {Promise<QueryJSONObject | ResultJSONObject>}
 */
export const findGps = (coordinates, maxDistance = 5000, query = {}) => {
    return doc.find({
        gps: {
            $nearSphere: {
                $geometry: {
                    type: "Point",
                    coordinates: coordinates
                },
                $minDistance: 0,
                $maxDistance: maxDistance
            }
        },
        ...query
    });
}

export const lazyBooksApplyBooks = async (userBooks) => {
    return await Promise.all([
        Books.find({
            _id: {
                $in: userBooks.map(i => i.bookid)
            }
        }),
        ApplyBooks.find({
            userbookid: {
                $in: userBooks.map(i => i._id)
            }
        }, {
            sort: { _id: -1 }
        })
    ]).then(([books, applyBooks]) => {
        return userBooks.map(i => {
            i.book = books.find(ii => ii._id === i.bookid)
            i.apply = applyBooks.find(ii => ii.userbookid === i._id)
            return i
        })
    })
}

export default doc