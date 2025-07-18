/*
**********************************************************
** بداية أكواد JavaScript (المنطق)           **
**********************************************************
*/

const maxCount = 100;
const tasbeehCounters = {};

// --- تهيئة عدادات التسبيح ديناميكيًا ---
document.querySelectorAll('.tasbeeh-item').forEach(item => {
    const button = item.querySelector('.tasbeeh-button');
    const progressBar = item.querySelector('.progress-bar');
    const countText = item.querySelector('.count-text');
    const messageDisplay = item.querySelector('.completion-message');
    const resetButton = item.querySelector('.reset-button');

    // استخراج الـ ID الفريد لكل زر (مثال: 'istighfar', 'hamd')
    const idPrefix = button.id.replace('Button', '');

    tasbeehCounters[idPrefix] = {
        count: 0,
        button: button,
        progressBar: progressBar,
        countText: countText,
        messageDisplay: messageDisplay
    };

    function updateProgressBar() {
        const currentCount = tasbeehCounters[idPrefix].count;
        const percentage = (currentCount / maxCount) * 100;
        progressBar.style.width = `${percentage}%`;
        countText.textContent = `${currentCount} / ${maxCount}`;

        if (currentCount === maxCount) {
            button.disabled = true;
            button.style.backgroundColor = '#ccc'; // لون رمادي للزر المعطل
            messageDisplay.style.display = 'block';
            progressBar.style.backgroundColor = '#2e7d32'; // أخضر داكن للـ progress bar المكتمل
            countText.style.color = '#fff'; // نص أبيض
            countText.style.textShadow = 'none';
        } else {
            button.disabled = false;
            button.style.backgroundColor = '#4CAF50'; // لون أخضر عادي
            messageDisplay.style.display = 'none';
            progressBar.style.backgroundColor = '#4CAF50'; // أخضر عادي للـ progress bar
            countText.style.color = '#333'; // نص داكن
            countText.style.textShadow = '0 0 3px rgba(255, 255, 255, 0.8)';
        }
    }

    // تهيئة الحالة الأولية عند تحميل الصفحة
    updateProgressBar();

    // إضافة مستمع حدث (event listener) لزر التسبيح
    button.addEventListener('click', () => {
        if (tasbeehCounters[idPrefix].count < maxCount) {
            tasbeehCounters[idPrefix].count++;
            updateProgressBar();
        }
    });

    // إضافة مستمع حدث (event listener) لزر إعادة الضبط
    resetButton.addEventListener('click', () => {
        tasbeehCounters[idPrefix].count = 0;
        updateProgressBar();
    });
});

// --- JavaScript للتحكم في القائمة الجانبية (Sidebar) ---
const sidebar = document.getElementById("mySidebar");
const mainContent = document.getElementById("main");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const openSidebarBtn = document.getElementById('openSidebarBtn');
const stickyOpenSidebarBtn = document.getElementById('stickyOpenSidebarBtn');
const closeSidebarBtn = document.getElementById('closeSidebarBtn'); // زر الإغلاق

function openNav() {
    if (window.innerWidth <= 992) {
        sidebar.style.width = "90%";
        mainContent.style.marginRight = "0";
        sidebarOverlay.style.display = "block";
        sidebarOverlay.classList.add('active');
    } else {
        sidebar.style.width = "320px";
        mainContent.style.marginRight = "320px";
    }
    sidebar.classList.add('open');
}

function closeNav() {
    sidebar.style.width = "0";
    mainContent.style.marginRight = "0";
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
    setTimeout(() => {
        sidebarOverlay.style.display = "none";
    }, 300); // إخفاء الأوفرلاي بعد انتهاء الانتقال
}

// استخدام دالة واحدة لفتح/إغلاق القائمة
function toggleNav() {
    if (sidebar.classList.contains('open')) {
        closeNav();
    } else {
        openNav();
    }
}

// إضافة مستمعي الأحداث للأزرار بدلاً من onclick في HTML
openSidebarBtn.addEventListener('click', toggleNav);
stickyOpenSidebarBtn.addEventListener('click', toggleNav);
closeSidebarBtn.addEventListener('click', closeNav);
sidebarOverlay.addEventListener('click', closeNav);

// --- JavaScript للتحكم في الصوت ---
const backgroundAudio = document.getElementById('backgroundAudio');
const toggleAudioButton = document.getElementById('toggleAudioButton');
const stickyToggleAudioButton = document.getElementById('stickyToggleAudioButton');

const audioButtonTextMain = document.getElementById('audioButtonText');
const audioButtonTextSticky = stickyToggleAudioButton.querySelector('span');

// كائن لحالة التطبيق
const appState = {
    isPlaying: true,
    currentPlayingSurahName: "الفاتحة"
};

function updateAudioButtonState() {
    if (appState.isPlaying) {
        audioButtonTextMain.textContent = 'Pause';
        audioButtonTextSticky.textContent = 'Pause';
    } else {
        audioButtonTextMain.textContent = 'Play';
        audioButtonTextSticky.textContent = 'Play';
    }
}

function updateSurahNameButtons() {
    openSidebarBtn.textContent = appState.currentPlayingSurahName;
    stickyOpenSidebarBtn.textContent = appState.currentPlayingSurahName;
}

window.addEventListener('load', () => {
    backgroundAudio.play().catch(error => {
        console.log("Audio autoplay was prevented. User interaction is needed.", error);
        appState.isPlaying = false;
        updateAudioButtonState();
    });
    updateAudioButtonState();
    updateSurahNameButtons();
    closeNav(); // التأكد من إغلاق السايدبار عند التحميل
});

toggleAudioButton.addEventListener('click', () => {
    if (appState.isPlaying) {
        backgroundAudio.pause();
    } else {
        backgroundAudio.play();
    }
    appState.isPlaying = !appState.isPlaying;
    updateAudioButtonState();
});

stickyToggleAudioButton.addEventListener('click', () => {
    if (appState.isPlaying) {
        backgroundAudio.pause();
    } else {
        backgroundAudio.play();
    }
    appState.isPlaying = !appState.isPlaying;
    updateAudioButtonState();
});

// --- قائمة السور كاملة (روابط MP3Quran.net) ---
const surahs = [
    { name: "الفاتحة", number: "001", audio: "https://server8.mp3quran.net/afs/001.mp3" },
    { name: "البقرة", number: "002", audio: "https://server8.mp3quran.net/afs/002.mp3" },
    { name: "آل عمران", number: "003", audio: "https://server8.mp3quran.net/afs/003.mp3" },
    { name: "النساء", number: "004", audio: "https://server8.mp3quran.net/afs/004.mp3" },
    { name: "المائدة", number: "005", audio: "https://server8.mp3quran.net/afs/005.mp3" },
    { name: "الأنعام", number: "006", audio: "https://server8.mp3quran.net/afs/006.mp3" },
    { name: "الأعراف", number: "007", audio: "https://server8.mp3quran.net/afs/007.mp3" },
    { name: "الأنفال", number: "008", audio: "https://server8.mp3quran.net/afs/008.mp3" },
    { name: "التوبة", number: "009", audio: "https://server8.mp3quran.net/afs/009.mp3" },
    { name: "يونس", number: "010", audio: "https://server8.mp3quran.net/afs/010.mp3" },
    { name: "هود", number: "011", audio: "https://server8.mp3quran.net/afs/011.mp3" },
    { name: "يوسف", number: "012", audio: "https://server8.mp3quran.net/afs/012.mp3" },
    { name: "الرعد", number: "013", audio: "https://server8.mp3quran.net/afs/013.mp3" },
    { name: "إبراهيم", number: "014", audio: "https://server8.mp3quran.net/afs/014.mp3" },
    { name: "الحجر", number: "015", audio: "https://server8.mp3quran.net/afs/015.mp3" },
    { name: "النحل", number: "016", audio: "https://server8.mp3quran.net/afs/016.mp3" },
    { name: "الإسراء", number: "017", audio: "https://server8.mp3quran.net/afs/017.mp3" },
    { name: "الكهف", number: "018", audio: "https://server8.mp3quran.net/afs/018.mp3" },
    { name: "مريم", number: "019", audio: "https://server8.mp3quran.net/afs/019.mp3" },
    { name: "طه", number: "020", audio: "https://server8.mp3quran.net/afs/020.mp3" },
    { name: "الأنبياء", number: "021", audio: "https://server8.mp3quran.net/afs/021.mp3" },
    { name: "الحج", number: "022", audio: "https://server8.mp3quran.net/afs/022.mp3" },
    { name: "المؤمنون", number: "023", audio: "https://server8.mp3quran.net/afs/023.mp3" },
    { name: "النور", number: "024", audio: "https://server8.mp3quran.net/afs/024.mp3" },
    { name: "الفرقان", number: "025", audio: "https://server8.mp3quran.net/afs/025.mp3" },
    { name: "الشعراء", number: "026", audio: "https://server8.mp3quran.net/afs/026.mp3" },
    { name: "النمل", number: "027", audio: "https://server8.mp3quran.net/afs/027.mp3" },
    { name: "القصص", number: "028", audio: "https://server8.mp3quran.net/afs/028.mp3" },
    { name: "العنكبوت", number: "029", audio: "https://server8.mp3quran.net/afs/029.mp3" },
    { name: "الروم", number: "030", audio: "https://server8.mp3quran.net/afs/030.mp3" },
    { name: "لقمان", number: "031", audio: "https://server8.mp3quran.net/afs/031.mp3" },
    { name: "السجدة", number: "032", audio: "https://server8.mp3quran.net/afs/032.mp3" },
    { name: "الأحزاب", number: "033", audio: "https://server8.mp3quran.net/afs/033.mp3" },
    { name: "سبأ", number: "034", audio: "https://server8.mp3quran.net/afs/034.mp3" },
    { name: "فاطر", number: "035", audio: "https://server8.mp3quran.net/afs/035.mp3" },
    { name: "يس", number: "036", audio: "https://server8.mp3quran.net/afs/036.mp3" },
    { name: "الصافات", number: "037", audio: "https://server8.mp3quran.net/afs/037.mp3" },
    { name: "ص", number: "038", audio: "https://server8.mp3quran.net/afs/038.mp3" },
    { name: "الزمر", number: "039", audio: "https://server8.mp3quran.net/afs/039.mp3" },
    { name: "غافر", number: "040", audio: "https://server8.mp3quran.net/afs/040.mp3" },
    { name: "فصلت", number: "041", audio: "https://server8.mp3quran.net/afs/041.mp3" },
    { name: "الشورى", number: "042", audio: "https://server8.mp3quran.net/afs/042.mp3" },
    { name: "الزخرف", number: "043", audio: "https://server8.mp3quran.net/afs/043.mp3" },
    { name: "الدخان", number: "044", audio: "https://server8.mp3quran.net/afs/044.mp3" },
    { name: "الجاثية", number: "045", audio: "https://server8.mp3quran.net/afs/045.mp3" },
    { name: "الأحقاف", number: "046", audio: "https://server8.mp3quran.net/afs/046.mp3" },
    { name: "محمد", number: "047", audio: "https://server8.mp3quran.net/afs/047.mp3" },
    { name: "الفتح", number: "048", audio: "https://server8.mp3quran.net/afs/048.mp3" },
    { name: "الحجرات", number: "049", audio: "https://server8.mp3quran.net/afs/049.mp3" },
    { name: "ق", number: "050", audio: "https://server8.mp3quran.net/afs/050.mp3" },
    { name: "الذاريات", number: "051", audio: "https://server8.mp3quran.net/afs/051.mp3" },
    { name: "الطور", number: "052", audio: "https://server8.mp3quran.net/afs/052.mp3" },
    { name: "النجم", number: "053", audio: "https://server8.mp3quran.net/afs/053.mp3" },
    { name: "القمر", number: "054", audio: "https://server8.mp3quran.net/afs/054.mp3" },
    { name: "الرحمن", number: "055", audio: "https://server8.mp3quran.net/afs/055.mp3" },
    { name: "الواقعة", number: "056", audio: "https://server8.mp3quran.net/afs/056.mp3" },
    { name: "الحديد", number: "057", audio: "https://server8.mp3quran.net/afs/057.mp3" },
    { name: "المجادلة", number: "058", audio: "https://server8.mp3quran.net/afs/058.mp3" },
    { name: "الحشر", number: "059", audio: "https://server8.mp3quran.net/afs/059.mp3" },
    { name: "الممتحنة", number: "060", audio: "https://server8.mp3quran.net/afs/060.mp3" },
    { name: "الصف", number: "061", audio: "https://server8.mp3quran.net/afs/061.mp3" },
    { name: "الجمعة", number: "062", audio: "https://server8.mp3quran.net/afs/062.mp3" },
    { name: "المنافقون", number: "063", audio: "https://server8.mp3quran.net/afs/063.mp3" },
    { name: "التغابن", number: "064", audio: "https://server8.mp3quran.net/afs/064.mp3" },
    { name: "الطلاق", number: "065", audio: "https://server8.mp3quran.net/afs/065.mp3" },
    { name: "التحريم", number: "066", audio: "https://server8.mp3quran.net/afs/066.mp3" },
    { name: "الملك", number: "067", audio: "https://server8.mp3quran.net/afs/067.mp3" },
    { name: "القلم", number: "068", audio: "https://server8.mp3quran.net/afs/068.mp3" },
    { name: "الحاقة", number: "069", audio: "https://server8.mp3quran.net/afs/069.mp3" },
    { name: "المعارج", number: "070", audio: "https://server8.mp3quran.net/afs/070.mp3" },
    { name: "نوح", number: "071", audio: "https://server8.mp3quran.net/afs/071.mp3" },
    { name: "الجن", number: "072", audio: "https://server8.mp3quran.net/afs/072.mp3" },
    { name: "المزمل", number: "073", audio: "https://server8.mp3quran.net/afs/073.mp3" },
    { name: "المدثر", number: "074", audio: "https://server8.mp3quran.net/afs/074.mp3" },
    { name: "القيامة", number: "075", audio: "https://server8.mp3quran.net/afs/075.mp3" },
    { name: "الإنسان", number: "076", audio: "https://server8.mp3quran.net/afs/076.mp3" },
    { name: "المرسلات", number: "077", audio: "https://server8.mp3quran.net/afs/077.mp3" },
    { name: "النبأ", number: "078", audio: "https://server8.mp3quran.net/afs/078.mp3" },
    { name: "النازعات", number: "079", audio: "https://server8.mp3quran.net/afs/079.mp3" },
    { name: "عبس", number: "080", audio: "https://server8.mp3quran.net/afs/080.mp3" },
    { name: "التكوير", number: "081", audio: "https://server8.mp3quran.net/afs/081.mp3" },
    { name: "الإنفطار", number: "082", audio: "https://server8.mp3quran.net/afs/082.mp3" },
    { name: "المطففين", number: "083", audio: "https://server8.mp3quran.net/afs/083.mp3" },
    { name: "الإنشقاق", number: "084", "audio": "https://server8.mp3quran.net/afs/084.mp3" },
    { name: "البروج", number: "085", audio: "https://server8.mp3quran.net/afs/085.mp3" },
    { name: "الطارق", number: "086", audio: "https://server8.mp3quran.net/afs/086.mp3" },
    { name: "الأعلى", number: "087", audio: "https://server8.mp3quran.net/afs/087.mp3" },
    { name: "الغاشية", number: "088", audio: "https://server8.mp3quran.net/afs/088.mp3" },
    { name: "الفجر", number: "089", audio: "https://server8.mp3quran.net/afs/089.mp3" },
    { name: "البلد", number: "090", audio: "https://server8.mp3quran.net/afs/090.mp3" },
    { name: "الشمس", number: "091", audio: "https://server8.mp3quran.net/afs/091.mp3" },
    { name: "الليل", number: "092", audio: "https://server8.mp3quran.net/afs/092.mp3" },
    { name: "الضحى", number: "093", audio: "https://server8.mp3quran.net/afs/093.mp3" },
    { name: "الشرح", number: "094", audio: "https://server8.mp3quran.net/afs/094.mp3" },
    { name: "التين", number: "095", audio: "https://server8.mp3quran.net/afs/095.mp3" },
    { name: "العلق", number: "096", audio: "https://server8.mp3quran.net/afs/096.mp3" },
    { name: "القدر", number: "097", audio: "https://server8.mp3quran.net/afs/097.mp3" },
    { name: "البينة", number: "098", audio: "https://server8.mp3quran.net/afs/098.mp3" },
    { name: "الزلزلة", number: "099", audio: "https://server8.mp3quran.net/afs/099.mp3" },
    { name: "العاديات", number: "100", audio: "https://server8.mp3quran.net/afs/100.mp3" },
    { name: "القارعة", number: "101", audio: "https://server8.mp3quran.net/afs/101.mp3" },
    { name: "التكاثر", number: "102", audio: "https://server8.mp3quran.net/afs/102.mp3" },
    { name: "العصر", number: "103", audio: "https://server8.mp3quran.net/afs/103.mp3" },
    { name: "الهمزة", number: "104", audio: "https://server8.mp3quran.net/afs/104.mp3" },
    { name: "الفيل", number: "105", audio: "https://server8.mp3quran.net/afs/105.mp3" },
    { name: "قريش", number: "106", audio: "https://server8.mp3quran.net/afs/106.mp3" },
    { name: "الماعون", number: "107", audio: "https://server8.mp3quran.net/afs/107.mp3" },
    { name: "الكوثر", number: "108", audio: "https://server8.mp3quran.net/afs/108.mp3" },
    { name: "الكافرون", number: "109", audio: "https://server8.mp3quran.net/afs/109.mp3" },
    { name: "النصر", number: "110", audio: "https://server8.mp3quran.net/afs/110.mp3" },
    { name: "المسد", number: "111", audio: "https://server8.mp3quran.net/afs/111.mp3" },
    { name: "الإخلاص", number: "112", audio: "https://server8.mp3quran.net/afs/112.mp3" },
    { name: "الفلق", number: "113", audio: "https://server8.mp3quran.net/afs/113.mp3" },
    { name: "الناس", number: "114", audio: "https://server8.mp3quran.net/afs/114.mp3" }
];

const surahsListDiv = document.getElementById('surahsList');

function displaySurahs() {
    surahsListDiv.innerHTML = '';

    surahs.forEach(surah => {
        const a = document.createElement('a');
        a.href = "#";
        a.dataset.src = surah.audio;
        a.dataset.name = surah.name;
        a.textContent = `${surah.number}. ${surah.name}`;
        a.addEventListener('click', event => {
            event.preventDefault();
            const audioSrc = event.target.dataset.src;
            const surahName = event.target.dataset.name;
            if (audioSrc) {
                backgroundAudio.src = audioSrc;
                backgroundAudio.load();
                backgroundAudio.play().catch(error => {
                    console.log("Error playing selected audio:", error);
                    alert('فشل تشغيل السورة. قد تحتاج إلى التفاعل مع الصفحة أولاً أو هناك مشكلة في ملف الصوت.');
                });
                appState.isPlaying = true; // تحديث حالة التشغيل
                appState.currentPlayingSurahName = surahName; // تحديث اسم السورة
                updateAudioButtonState();
                updateSurahNameButtons();
            }
            closeNav();
        });
        surahsListDiv.appendChild(a);
    });
}

window.addEventListener('load', () => {
    displaySurahs();
});

// إغلاق السايدبار عند تغيير حجم الشاشة (لضمان السلوك الصحيح)
window.addEventListener('resize', () => {
    closeNav();
});

// --- JavaScript للتحكم في الـ Sticky Header (ظهوره عند السكرول) ---
const stickyHeader = document.getElementById('stickyHeader');
let headerControlsElement;
let headerOffsetThreshold = 100;

window.addEventListener('load', () => {
    headerControlsElement = document.querySelector('.header-controls');
    if (headerControlsElement) {
        headerOffsetThreshold = headerControlsElement.offsetHeight + 50;
    }
    stickyHeader.style.top = "-70px"; // إخفاءه في البداية
});

window.onscroll = function() {
    if (window.innerWidth <= 992) { // فقط على الشاشات الصغيرة والمتوسطة
        if (window.pageYOffset > headerOffsetThreshold) {
            stickyHeader.style.top = "0";
        } else {
            stickyHeader.style.top = "-70px";
        }
    } else {
        stickyHeader.style.top = "-70px"; // إخفاءه على الشاشات الكبيرة
    }
};

/* --- وظيفة نسخ الدعاء (اختياري) --- */
document.querySelectorAll('.dua-button').forEach(button => {
    button.addEventListener('click', function() {
        const duaText = this.previousElementSibling.textContent;
        navigator.clipboard.writeText(duaText)
            .then(() => {
                this.textContent = 'Copied!';
                this.style.backgroundColor = '#4CAF50';
                setTimeout(() => {
                    this.textContent = 'ادعُ بهذا الدعاء';
                    this.style.backgroundColor = '#2196F3';
                }, 1500);
            })
            .catch(err => {
                console.error('فشل نسخ النص: ', err);
                alert('Failed to copy dua.');
            });
    });
});

/*
**********************************************************
** نهاية أكواد JavaScript (المنطق)           **
**********************************************************
*/