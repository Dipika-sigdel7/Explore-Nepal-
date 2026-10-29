
const districts = [
    ["Taplejung", "Koshi"],
    ["Panchthar", "Koshi"],
    ["Ilam", "Koshi"],
    ["Jhapa", "Koshi"],
    ["Morang", "Koshi"],
    ["Sunsari", "Koshi"],
    ["Dhankuta", "Koshi"],
    ["Terhathum", "Koshi"],
    ["Sankhuwasabha", "Koshi"],
    ["Bhojpur", "Koshi"],
    ["Solukhumbu", "Koshi"],
    ["Okhaldhunga", "Koshi"],
    ["Khotang", "Koshi"],
    ["Udayapur", "Koshi"],

    ["Saptari", "Madhesh"],
    ["Siraha", "Madhesh"],
    ["Dhanusha", "Madhesh"],
    ["Mahottari", "Madhesh"],
    ["Sarlahi", "Madhesh"],
    ["Rautahat", "Madhesh"],
    ["Bara", "Madhesh"],
    ["Parsa", "Madhesh"],

    ["Dolakha", "Bagmati"],
    ["Ramechhap", "Bagmati"],
    ["Sindhuli", "Bagmati"],
    ["Kavrepalanchok", "Bagmati"],
    ["Sindhupalchok", "Bagmati"],
    ["Rasuwa", "Bagmati"],
    ["Nuwakot", "Bagmati"],
    ["Dhading", "Bagmati"],
    ["Chitwan", "Bagmati"],
    ["Makwanpur", "Bagmati"],
    ["Bhaktapur", "Bagmati"],
    ["Lalitpur", "Bagmati"],
    ["Kathmandu", "Bagmati"],

    ["Gorkha", "Gandaki"],
    ["Manang", "Gandaki"],
    ["Mustang", "Gandaki"],
    ["Myagdi", "Gandaki"],
    ["Kaski", "Gandaki"],
    ["Lamjung", "Gandaki"],
    ["Tanahun", "Gandaki"],
    ["Nawalpur", "Gandaki"],
    ["Syangja", "Gandaki"],
    ["Parbat", "Gandaki"],
    ["Baglung", "Gandaki"],

    ["Rukum East", "Lumbini"],
    ["Rolpa", "Lumbini"],
    ["Pyuthan", "Lumbini"],
    ["Gulmi", "Lumbini"],
    ["Arghakhanchi", "Lumbini"],
    ["Palpa", "Lumbini"],
    ["Nawalparasi West", "Lumbini"],
    ["Rupandehi", "Lumbini"],
    ["Kapilvastu", "Lumbini"],
    ["Dang", "Lumbini"],
    ["Banke", "Lumbini"],
    ["Bardiya", "Lumbini"],

    ["Dolpa", "Karnali"],
    ["Mugu", "Karnali"],
    ["Humla", "Karnali"],
    ["Jumla", "Karnali"],
    ["Kalikot", "Karnali"],
    ["Dailekh", "Karnali"],
    ["Jajarkot", "Karnali"],
    ["Western Rukum", "Karnali"],
    ["Salyan", "Karnali"],
    ["Surkhet", "Karnali"],

    ["Bajura", "Sudurpashchim"],
    ["Bajhang", "Sudurpashchim"],
    ["Darchula", "Sudurpashchim"],
    ["Baitadi", "Sudurpashchim"],
    ["Dadeldhura", "Sudurpashchim"],
    ["Doti", "Sudurpashchim"],
    ["Achham", "Sudurpashchim"],
    ["Kailali", "Sudurpashchim"],
    ["Kanchanpur", "Sudurpashchim"]
];

// MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

// Close mobile menu after choosing a link
navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
    });
});

// DISPLAY DISTRICTS
const districtList = document.getElementById("districtList");
const districtFilter = document.getElementById("districtFilter");

function displayDistricts(searchTerm = "") {
    districtList.replaceChildren();

    const matches = districts.filter(([name]) =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (matches.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No matching district found.";
        message.className = "no-results";
        districtList.appendChild(message);
        return;
    }

    matches.forEach(([name, province]) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "district-chip";
        button.textContent = name;
        button.title = `${name} — ${province} Province`;

        button.addEventListener("click", () => {
            // Later, connect this to the Flask district detail route.
            alert(
                `${name} District selected!\n\n` +
                "Next, we will show its tourist places and hotels."
            );
        });

        districtList.appendChild(button);
    });
}

districtFilter.addEventListener("input", event => {
    displayDistricts(event.target.value.trim());
});

// SEARCH FEATURED PLACES
const searchForm = document.getElementById("searchForm");

searchForm.addEventListener("submit", event => {
    event.preventDefault();

    const district = document
        .getElementById("districtSearch")
        .value.trim()
        .toLowerCase();

    const keyword = document
        .getElementById("placeSearch")
        .value.trim()
        .toLowerCase();

    const cards = document.querySelectorAll(".destination-card");
    let visibleCount = 0;

    cards.forEach(card => {
        const cardDistrict = card.dataset.district.toLowerCase();
        const searchableText = card.dataset.search.toLowerCase();
        const title = card.querySelector("h3").textContent.toLowerCase();

        const districtMatches =
            !district || cardDistrict.includes(district);

        const keywordMatches =
            !keyword ||
            searchableText.includes(keyword) ||
            title.includes(keyword);

        const visible = districtMatches && keywordMatches;

        card.hidden = !visible;

        if (visible) {
            visibleCount++;
        }
    });

    document.getElementById("noResults").hidden = visibleCount !== 0;

    document.getElementById("destinations").scrollIntoView({
        behavior: "smooth"
    });
});

// FOOTER YEAR
document.getElementById("year").textContent =
    new Date().getFullYear();

// INITIALIZE DISTRICT DIRECTORY
displayDistricts();
