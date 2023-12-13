import {
    MailOutline,
    PhoneAndroid,
} from "@material-ui/icons";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import "./Profile.css";

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      type: 'number',
      width: 120,
    },
    {
      field: 'carType',
      headerName: 'Car',
      width: 200,
    },
  ];

const rows = [
    { id: 1, lastName: 'Stark', firstName: 'Arya', phoneNumber: 714551234, carType: 'Honda Accord' },
    { id: 2, lastName: 'Lannister', firstName: 'Tyrion', phoneNumber: 310794567, carType: 'Ford Fusion' },
    { id: 3, lastName: 'Smith', firstName: 'John', phoneNumber: 562876234, carType: 'Chevrolet Malibu' },
    { id: 4, lastName: 'Swell', firstName: 'Toby', phoneNumber: 909321568, carType: 'Nissan Altima' },
    { id: 5, lastName: 'Grey', firstName: 'Alistar', phoneNumber: 415877890, carType: 'Mazda3' },
    { id: 6, lastName: 'Martell', firstName: 'Kyle', phoneNumber: 650245678, carType: 'Subaru Impreza' },
    { id: 7, lastName: 'Barrel', firstName: 'Robert', phoneNumber: 819876543, carType: 'Hyundai Elantra' },
    { id: 8, lastName: 'Chu', firstName: 'Samuel', phoneNumber: 213865432, carType: 'Kia Forte' },
    { id: 9, lastName: 'Arryn', firstName: 'Joel', phoneNumber: 323654321, carType: 'Volkswagen Jetta' },
  ];

export default function Profile() {



    return (
        <div className ="profile">
            <div className ="profileTitleContainer"> 
                <h1 className = "profileTitle"> Profile </h1>
            </div>
            <div className ="profileContainer">
                <div className ="profileShow">
                    <div className = "profileTop">
                        <img src = "https://media.licdn.com/dms/image/D5603AQESw1FfqbEmcw/profile-displayphoto-shrink_200_200/0/1693894909694?e=2147483647&v=beta&t=Nv0g7I9gGKO-ZHWatlocxXl_mHqIFncfKKDklfM7KhA"
                        alt =""
                        className = "profileImage"
                        />
                        <div className = "profileTopTitle">
                            <span className ="profileName"> Will H. </span>
                            <span className ="profileTitle"> Sales Rep. </span>
                        </div>
                    </div>
                    <div className ="profileBottom">
                        <span className ="profileBottomTitle"> Account Details </span>
                        <div className ="profileInfo">
                            <PhoneAndroid className ="profileInfoIcons" />
                            <span className = "profileInfoContent"> (122) 333-4444 </span>
                        </div>
                        <div className ="profileInfo">
                            <MailOutline className ="profileInfoIcons" />
                            <span className = "profileInfoContent"> testing123@gmail.com </span>
                        </div>
                    </div>
                </div>
            </div>
            <h1>Your Listings</h1>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </div>
    );
}