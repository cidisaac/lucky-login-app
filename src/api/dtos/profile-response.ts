import ProfileDao from "../../integration/database/dao/ProfileDao";

export class ProfileResponse {
    id: number;
    name: string;
    address: Address;

    constructor(id: number, name: string, address: Address) {
        this.id = id;
        this.name = name;
        this.address = address;
    }

    static fromDao(profileDao: ProfileDao): ProfileResponse {
        return new ProfileResponse(
            profileDao.id,
            profileDao.name,
            new Address(
                profileDao.street,
                profileDao.city,
                profileDao.country
            )
        )
    }
}

class Address {
    street: string;
    city: string;
    country: string;

    constructor(street: string, city: string, country: string) {
        this.street = street;
        this.city = city;
        this.country = country;
    }
}