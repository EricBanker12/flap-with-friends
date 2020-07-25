module.exports = {
  siteMetadata: {
    siteUrl: `https://flapwithfriends.tk`,
    title: `Flap with Friends`,
    description: `Play a remake of Dong Nguyen's Flappy Bird, the video game, with added multiplayer to compete with friends.`,
    author: `Eric Banker`,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Mali:ital,wght@0,400;0,500;1,400']
        }
      }
    },  
    `gatsby-plugin-sitemap`,{
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        policy: [{userAgent: `*`, allow: `/`, disallow: `/api`}]
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-no-sourcemaps`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Flap with Friends`,
        short_name: `F.W.F`,
        start_url: `/`,
        background_color: `#75CAEB`,
        theme_color: `#158CBA`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
