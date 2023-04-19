const Url=require("../model/urlModel")
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncerrors = require("../middleware/catchAsyncerrors");
const express = require('express')
const validUrl = require('valid-url')
const shortid = require('shortid')

exports.urlShortener=catchAsyncerrors(async(req,res,next)=>{
    const baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(baseUrl)
    const {
        longUrl
    } = req.body
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base URL')
    }
    const urlCode = shortid.generate()
    
    if (validUrl.isUri(longUrl)) {
        try {
            /* The findOne() provides a match to only the subset of the documents 
            in the collection that match the query. In this case, before creating the short URL,
            we check if the long URL was in the DB ,else we create it.
            */
            let url = await Url.findOne({
                longUrl
            })
            // url exist and return the respose
            if (url) {
                res.json({
                    success:false,
                    message:"URL already in DB",
                    url})
            } else {
                // join the generated short code the the base url
                const shortUrl = baseUrl + '/' + urlCode

                // invoking the Url model and saving to the DB
                url = await Url.create({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                })
                req.user.urls.push(url._id);
                await req.user.save();
                res.json({
                    success:true,
                    message:"URL successfully added to DB",
                    url})
            }
        }
        // exception handler
        catch (err) {
            console.log(err)
            res.status(500).json('Server Error')
        }
    } else {
        res.status(401).json('Invalid longUrl')
    }
})

exports.redirect=catchAsyncerrors(async(req,res,next)=>{
    try {
        // find a document match to the code in req.params.code
        const url = await Url.findOne({
            urlCode: req.params.code
        })
        if (url) {
            // when valid we perform a redirect
            return res.redirect(url.longUrl)
        } else {
            // else return a not found 404 status
            return res.status(404).json('No URL Found')
        }

    }
    // exception handler
    catch (err) {
        console.error(err)
        res.status(500).json('Server Error')
    }
})