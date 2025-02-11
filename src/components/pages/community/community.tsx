"use client"

import React from "react";
import {ImageCarousel} from "@/components/constitution/carousel-indicator";
import {CommunityFeed} from "@/components/pages/community/community-feed";



export const Community = () => {
    return <div className="mt-3 mb-10">
        <div className="max-width-suitable px-[60px] mx-auto">
            <ImageCarousel/>
        </div>
        <div className="max-width-suitable px-[60px] mx-auto mt-20">
            <CommunityFeed/>
        </div>
    </div>
}

