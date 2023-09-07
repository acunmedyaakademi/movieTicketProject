
// Main Container görünürlük fonsksiyonu
const mainContainer = document.querySelector(".container");
function setActiveHome(set) {  
    set === true ? mainContainer.classList.add("active"):mainContainer.classList.remove("active");
}

// Panel Container görünürlük fonsksiyonu
const backImage = document.querySelector(".backImage");
const panelContainer = document.querySelector(".panelContainer");
function setActivePanel(set){
        set === true ? panelContainer.classList.remove("deactive"):panelContainer.classList.add("deactive")
        set === true ? backImage.classList.remove("deactive"):backImage.classList.add("deactive")
}

// Fetch işlemleri SUPABASE 
const fetchData = async (url) => {
    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4d3BndGZyenR2ZXFncXlja25xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzQxMjM4NCwiZXhwIjoyMDA4OTg4Mzg0fQ.fxxdxsJkoR5d_1IsCiar6iiGa2WUi5UWAPo_N_dXggg",
                "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4d3BndGZyenR2ZXFncXlja25xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzQxMjM4NCwiZXhwIjoyMDA4OTg4Mzg0fQ.fxxdxsJkoR5d_1IsCiar6iiGa2WUi5UWAPo_N_dXggg" 
            }
        });
        return await response.json();
    } catch (error) {
        console.error("Fetch error:");
    }
};

// Fetch işlemleri TMBD MOVİE APİ 
const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDc5N2RkNGU0MWU3ODE1MWY0NmE1MTBmM2M1MmJiMSIsInN1YiI6IjY0ZWZjNGVhY2FhNTA4MDE0YzhiMzJhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UWMW2nEvwjByMme8MI_Pgwc3l0j6wH5NLB5Zgf1a26k';
async function fetchMovieData(url) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`
        }
    };
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('HTTP Error: ' + response.status);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
