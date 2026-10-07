# Custom Critical Demo Website

> **Demo website:** This project is for demonstration purposes only. It is not an official company website.

This repository contains the site code for the Custom Critical AEM Edge Delivery Services (EDS) demo website. Page content is authored separately in Document Authoring (DA) at [da.live](https://da.live/).

## Site URLs

| Environment | URL | Purpose |
| --- | --- | --- |
| Main preview | [main--fxf-customcritical--mrugesh-adobe.aem.page](https://main--fxf-customcritical--mrugesh-adobe.aem.page/) | Preview using code from `main` |
| Main live | [main--fxf-customcritical--mrugesh-adobe.aem.live](https://main--fxf-customcritical--mrugesh-adobe.aem.live/) | Published site using code from `main` |
| FF preview | [ff--fxf-customcritical--mrugesh-adobe.aem.page](https://ff--fxf-customcritical--mrugesh-adobe.aem.page/) | Preview using code from the `ff` branch |
| DA authoring | [da.live](https://da.live/#/mrugesh-adobe/fxf-customcritical) | Create and edit site content |

Code and content deploy separately: merging code to `main` updates the site code, while authors preview and publish content from DA.

## Requirements

- Git
- [Node.js LTS](https://nodejs.org/) and npm
- [Google Chrome](https://www.google.com/chrome/) for authoring with Sidekick

## Get the project running

Clone the repository, install its dependencies, and start the local AEM development server:

```sh
git clone https://github.com/mrugesh-adobe/fxf-cc.git
cd fxf-cc
npm install
npx -y @adobe/aem-cli up
```

Open [http://localhost:3000](http://localhost:3000). The local server runs your code against the site's preview content. Keep it running while you work; changes to JavaScript and CSS are picked up automatically.

To check code quality before opening a pull request:

```sh
npm run lint
```

## Authoring content

Authors create and edit pages in [DA](https://da.live/#/mrugesh-adobe/fxf-customcritical), not in this code repository. Use the [AEM Sidekick Chrome extension](https://chromewebstore.google.com/detail/aem-sidekick/igkmdomcgoebiipaifhmpfjhbjccggml) to preview and publish DA content, and to access authoring actions from preview pages. After editing content in DA, select **Preview** in Sidekick to review it; publish when it is ready.

For the full walkthrough, see Adobe's [AEM Edge Delivery Services developer tutorial](https://www.aem.live/developer/tutorial) and [Sidekick documentation](https://www.aem.live/docs/sidekick).

## Further reading

- [AEM developer documentation](https://www.aem.live/docs/)
- [The anatomy of an EDS project](https://www.aem.live/developer/anatomy-of-a-project)
- [Web performance](https://www.aem.live/developer/keeping-it-100)
- [Markup, sections, blocks, and auto-blocking](https://www.aem.live/developer/markup-sections-blocks)
