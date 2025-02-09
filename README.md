# Objective

Recreate the hero section of the design with functional and responsive search bar and filters,
including the price histogram and count display. [Figma Link](https://www.figma.com/design/GnMBaf7SDbDnNfeLlV37SR/lystio-Test-task?node-id=1-97&t=WbkfW7Bsq7OI4UVH-0)

# Requirements

## General:

- Pixel-perfect design match (colors, fonts, spacing).
- Fully responsive for desktop, tablet, and mobile (as there’s no design for mobile, try to be creative and implement based on your feelings).

## Hero Section:

- Background Image/Text: Large scalable hero image; text: "Rent faster, Buy smarter."
- Action Buttons: Toggles for "Rent," "Buy," and "Lystio AI" (the last has no functionality for this task)
- Search Bar:
  - Location (mapbox address autocomplete - details below)
    - As long as no search text is entered, display Popover as described in figma withe
      - List of recent searches (API usage see below)
      - List of Cities and districts (API usage see below)
  - Category (use the JSON at https://gist.github.com/waquner/f51507e13214d998e7ef4efb8e998a4f for this)
  - Price Range (slider with histogram - API usage see below)
  - Include a Search button
- Text “X verified listingsfor apartments, houses, office and more“
  - Should be dynamically Updated based on the set filters (Api usage below)
- The Rent/Buy buttons and all the filters should dynamically update the price histogram and the number of verified listings

## Deliverable

Deployed Demo web app (e.g. on vercel) or as shared github repo (please share with github user waquner)

● Bonus: Animations/transitions for dropdowns and sliders.

# Technical Details

## Mapbox Search

The mapbox search is only to demonstrate the use of it, for filtering (see below) only the filter by districts should be implemented.

- Search should be implemented with mapbox Address Autofill / Search Box API

  - https://docs.mapbox.com/mapbox-search-js/guides/autofill/react/
  - https://docs.mapbox.com/api/search/search-box/#interactive-search

- Token

  - pk.eyJ1IjoibHlzdGlvIiwiYSI6ImNtMjA3cmFoejBnMngycXM4anNuNXFmaTQifQ.y-WiEerYZrFOm8Xd8a7GwQ
  - (good for http://localhost:3000, https://localhost, https://lystio.local, https://lystio.dev and https://lystio.co)

- Address Autocomplete Config:
  - `language=de`
  - `country=at`
  - `types=address,district,place,locality,neighborhood,city,street,poi`

## Recent Searches

Can be obtained by calling GET https://api.lystio.co/geo/search/recent (Swagger: https://api.lystio.co/swagger-demo#/Geo/GeoController_searchRecent)

## Cities / districts

Can be obtained by calling GET https://api.lystio.co/geo/boundaries/popular (Swagger: https://api.lystio.co/swagger-demo#/Geo/GeoController_boundariesPopular)

## Filters

For the next 2 API interactions (price histogram and tenements count), it is necessary to dynamically create a filter object and send it to the API:
● `withinId`: Array with the IDs of the selected district(s) (e.g. ["osm:b4:-109166:b9:-1990592"])
● `type`: Array with the ID of the selected type (e.g. [1])
● `rentType`: Array with rent or buy based on toggle buttons (e.g. ["rent"])
● `rent`: Array with min and max rent (e.g. [800, 1200]) - this is ignored for the histogram call, as it makes no sense there

## Price histogram

Can be obtained by calling POST https://api.lystio.co/tenement/search/histogram It returns the min, max values of the prices and 20 buckets including the number of properties in this bucket-range to display as a histogram. (Swagger: https://api.lystio.co/swagger-demo#/Tenements/TenementController_searchHistogram)

## Tenements (properties) count

Can be obtained by calling POST https://api.lystio.co/tenement/search/count (Swagger: https://api.lystio.co/swagger-demo#/Tenements/TenementController_searchCount)
