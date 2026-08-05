import { MetadataRoute } from "next";


export default function sitemap(): MetadataRoute.Sitemap {


  const baseUrl =
    "https://your-domain.com";


  return [

    {
      url: baseUrl,
      lastModified: new Date(),
    },


    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
    },


    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },


    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },


    {
      url:
        `${baseUrl}/tools/age-calculator`,
      lastModified: new Date(),
    },


    {
      url:
        `${baseUrl}/tools/bmi-calculator`,
      lastModified: new Date(),
    },


    {
      url:
        `${baseUrl}/tools/password-generator`,
      lastModified: new Date(),
    },


    {
      url:
        `${baseUrl}/tools/word-counter`,
      lastModified: new Date(),
    },


    {
      url:
        `${baseUrl}/tools/qr-generator`,
      lastModified: new Date(),
    },


    {
      url:
        `${baseUrl}/tools/unit-converter`,
      lastModified: new Date(),
    },


    {
      url:
        `${baseUrl}/tools/case-converter`,
      lastModified: new Date(),
    },


    {
      url:
        `${baseUrl}/tools/json-formatter`,
      lastModified: new Date(),
    },


    {
      url:
        `${baseUrl}/tools/url-encoder`,
      lastModified: new Date(),
    },


    {
      url:
        `${baseUrl}/tools/percentage-calculator`,
      lastModified: new Date(),
    },


  ];

}