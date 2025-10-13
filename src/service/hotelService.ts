import { IHotel } from "../interface/hotelInterface";
import Hotel from "../models/hotelModels";

export const add = async (data: IHotel) => {
    const hotel = new Hotel(data);
    return hotel.save();
};

export const list = async (limit: number, startFrom: number) => {
    const hotel = await Hotel.find()
        .limit(limit)
        .skip(startFrom)
        .sort({ createAt: -1 });
    return hotel;
}

export const getById = async (id: string) => {
    return await Hotel.findById(id);
}
export const deleteById = async (id: string) => {
    return await Hotel.findByIdAndDelete(id);
}

