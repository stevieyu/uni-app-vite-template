import {collection} from "@/features/common/services/mpserverless";

const doc = collection('UserBooks')

const findGps = (coordinates, maxDistance = 5000) => {
    return doc.find(
        {
            location: {
                $nearSphere: {
                    $geometry: {
                        type: "Point",
                        coordinates: coordinates
                    },
                    $maxDistance: maxDistance
                }
            }
        }
    );
}

export default doc