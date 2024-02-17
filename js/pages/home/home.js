/*

    Loading saved settings

*/


let settings = {
    otherLinksHidden: false,
    darkMode: true,
    pinnedLinks: [],
    language: 0
}


function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Get current settings on page load
try {
    settings = JSON.parse(getCookie("settings"));
} catch (err) {
    setCookie("settings", JSON.stringify(settings), 365 * 5)
}

// Dark mode
const darkModeButton = document.getElementById("darkModeButton");

function toggleDarkMode() {
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
    }, 400);

    const body = document.querySelector("body");

    if (!settings.darkMode) {
        settings.darkMode = true;
        body.classList.add("darkMode")
        darkModeButton.innerHTML = "Ljust läge"
    } else {
        settings.darkMode = false;
        body.classList.remove("darkMode")
        darkModeButton.innerHTML = "Mörkt läge"
    }

    setCookie("settings", JSON.stringify(settings), 365 * 5)
}

if (settings.darkMode) {
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
    }, 400);

    const body = document.querySelector("body");
    body.classList.add("darkMode")
    darkModeButton.innerHTML = "Ljust läge"
}

darkModeButton.addEventListener("click",toggleDarkMode);



// Hidden other links

const showHideText = document.getElementById("showHideOtherLinks");

function toggleOtherLinksVisibility() {

    if (!settings.otherLinksHidden) {
        otherLinksContainer.classList.add("hidden")
        showHideText.innerHTML = "Visa"
        settings.otherLinksHidden = true;
    } else {
        otherLinksContainer.classList.remove("hidden")
        showHideText.innerHTML = "Dölj"
        settings.otherLinksHidden = false;
    }
    
    setCookie("settings", JSON.stringify(settings), 365 * 5)
}

if (settings.otherLinksHidden) {
    otherLinksContainer.classList.add("hidden")
    showHideText.innerHTML = "Visa"
}

showHideText.addEventListener("click", toggleOtherLinksVisibility);



/*

    General info

*/

const weekText = document.getElementById("week"),
      dateText = document.getElementById("date");

Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    var today = new Date(this.getFullYear(),this.getMonth(),this.getDate());
    var dayOfYear = ((today - onejan + 86400000)/86400000);
    return Math.ceil(dayOfYear/7)
};

weekText.innerHTML = (new Date()).getWeek();

dateText.innerHTML = (new Date()).toLocaleDateString("sv-se");


/*

    Links

*/

const otherLinks = [
    {
        id: 0,
        titleSv: "Kursrum",
        titleEn: "Course rooms",
        link: "https://liuonline.sharepoint.com/sites/Lisam/SitePages/Kurser-och-program.aspx"
    },
    {
        id: 1,
        titleSv: "Kursregistrering",
        titleEn: "Course registration",
        link: "https://www.student.ladok.se/student/app/studentwebb/"
    },
    {
        id: 2,
        titleSv: "Teams (Webbversionen)",
        titleEn: "Teams (Web version)",
        link: "https://teams.microsoft.com/"
    },
    {
        id: 3,
        titleSv: "OneDrive",
        titleEn: "OneDrive",
        link: "https://liuonline-my.sharepoint.com/_layouts/15/MySite.aspx?MySiteRedirect=AllDocuments"
    },
    {
        id: 4,
        titleSv: "Studieresultat",
        titleEn: "Study results",
        link: "https://www.student.ladok.se/student/app/studentwebb/min-utbildning/alla"
    },
    {
        id: 5,
        titleSv: "Tentamensstatistik",
        titleEn: "Exam statistics",
        link: "https://liuonline.sharepoint.com/sites/Lisam/SitePages/Tentamenstatistik.aspx"
    },
    {
        id: 6,
        titleSv: "Intyg (Registreringsintyg, resultatintyg m.m.)",
        titleEn: "Transcripts",
        link: "https://www.student.ladok.se/student/app/studentwebb/intyg"
    },
    {
        id: 7,
        titleSv: "Kontakta Infocenter eller Helpdesk",
        titleEn: "Contact Infocenter or Helpdesk",
        link: "https://liuonline.sharepoint.com/sites/student-stod-och-kontakt/SitePages/Home.aspx"
    },
    {
        id: 8,
        titleSv: "Kontakta Studievägledningen",
        titleEn: "Contact the study advisory service",
        link: "https://liuonline.sharepoint.com/sites/student-stod-och-kontakt/SitePages/studievagledning.aspx"
    },
    {
        id: 9,
        titleSv: "Driftinfo och statistik IT-system",
        titleEn: "Status of IT systems",
        link: "https://status.liu.se/"
    },
    {
        id: 10,
        titleSv: "Min IT",
        titleEn: "My IT",
        link: "https://minit.liu.se/"
    },
    {
        id: 11,
        titleSv: "Eduroam (Wi-Fi)",
        titleEn: "Eduroam (Wi-Fi)",
        link: "https://minit.liu.se/myaccounts/Eduroam"
    },
    {
        id: 12,
        titleSv: "Mjukvara",
        titleEn: "Software",
        link: "https://minit.liu.se/applications"
    },
    {
        id: 13,
        titleSv: "Biblioteket",
        titleEn: "Library",
        link: "https://liuonline.sharepoint.com/sites/student-under-studietiden/SitePages/Biblioteket.aspx"
    },
    {
        id: 14,
        titleSv: "Terminstider",
        titleEn: "Semester periods",
        link: "https://liuonline.sharepoint.com/sites/student-under-studietiden/SitePages/Terminstider.aspx"
    },
    {
        id: 15,
        titleSv: "Öppettider lokaler",
        titleEn: "Opening hours and access",
        link: "https://liuonline.sharepoint.com/sites/student-campus-och-lokaler/SitePages/oppettider.aspx"
    },
    {
        id: 16,
        titleSv: "Baljan kaffekort",
        titleEn: "Baljan coffee card",
        link: "https://www.baljan.org/credits"
    }
]

const otherLinksContainer = document.getElementById("otherLinks");
const pinnedLinksContainer = document.getElementById("pinnedLinks");
const pinnedLinksTitle = document.getElementById("pinnedLinksTitle");

function updateLinks() {
    otherLinksContainer.innerHTML = "";
    pinnedLinksContainer.innerHTML = "";

    otherLinks.forEach(element => {
        
        if (!settings.pinnedLinks.includes(element.id)) {
            
            otherLinksContainer.innerHTML += `
                <div class="linkContainer">
                    <a href="` + element.link + `">` + (settings.language == 0 ? element.titleSv : element.titleEn) + `</a>
                    <div class="pinIcon" onclick="addPinnedLink(` + element.id + `)">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M619.999-471.538 691.536-400v59.999H509.999v219.998l-29.999 30-29.999-30v-219.998H268.464V-400l71.537-71.538V-760h-40v-59.999h359.998V-760h-40v288.462ZM354-400h252l-46-46v-314H400v314l-46 46Zm126 0Z"/></svg>
                    </div>
                </div>
                `

            return;
        }
        
        pinnedLinksContainer.innerHTML += `
            <div class="linkContainer">
                <a href="` + element.link + `">` + (settings.language == 0 ? element.titleSv : element.titleEn) + `</a>
                <div class="pinIcon" onclick="removePinnedLink(` + element.id + `)">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M292.309-140.001q-29.923 0-51.115-21.193-21.193-21.192-21.193-51.115V-720h-40v-59.999H360v-35.384h240v35.384h179.999V-720h-40v507.691q0 30.308-21 51.308t-51.308 21H292.309ZM680-720H280v507.691q0 5.385 3.462 8.847 3.462 3.462 8.847 3.462h375.382q4.616 0 8.463-3.846 3.846-3.847 3.846-8.463V-720ZM376.155-280h59.999v-360h-59.999v360Zm147.691 0h59.999v-360h-59.999v360ZM280-720v520-520Z"/></svg>
                </div>
            </div>
        `

    });

    if (settings.pinnedLinks.length > 0) {
        pinnedLinksTitle.classList.remove("hidden")
    } else {
        pinnedLinksTitle.classList.add("hidden")
    }
}

updateLinks();

function addPinnedLink(id) {
    settings.pinnedLinks.push(id);
    updateLinks();
    setCookie("settings", JSON.stringify(settings), 365 * 5)
}

function removePinnedLink(id) {
    settings.pinnedLinks.splice(settings.pinnedLinks.indexOf(id), 1);
    updateLinks();
    setCookie("settings", JSON.stringify(settings), 365 * 5)
}

