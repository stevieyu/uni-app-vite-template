import {collection} from "@/features/common/services/mpserverless";

const doc = collection('UserBooks')

/**
 *
 * @param coordinates [location.longitude, location.latitude]
 * @param maxDistance 单位米
 * @param query
 * @returns {Promise<QueryJSONObject | ResultJSONObject>}
 */
export const findGps = (coordinates, maxDistance = 5000,  query = {}) => {
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

export default doc