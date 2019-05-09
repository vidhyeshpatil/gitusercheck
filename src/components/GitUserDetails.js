import React from 'react';

const GitUserDetails = (props) => {
    return (
        <div className = "info-container">
            <img className = "profile-image" src = {props.user.avatar_url} alt = "profileImage" />
            <div className = "text-container">
                <div>Name : {props.user.name != null ? props.user.name : "--"} </div>
                <div>Company : {props.user.company != null ? props.user.company : "--"} </div>
                <div>Email : {props.user.email != null ? props.user.email : "--"} </div>
                <div>Followers : {props.user.followers} </div>
                <div>Following : {props.user.following} </div>
            </div>
        </div>
    );
}

export default GitUserDetails;