// Filter Portofolio
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Logika Modal Order
const modal = document.getElementById('orderModal');
const packageTag = document.getElementById('selectedPackage');
let currentPackage = "";

function openOrderModal(packageName) {
    currentPackage = packageName;
    packageTag.innerText = "Pesan: " + packageName;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop scroll
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Enable scroll
}

// Menutup modal jika klik di luar box
window.onclick = function(event) {
    if (event.target == modal) closeModal();
}

// GANTI URL_WEB_APP_ANDA dengan link yang Anda salin dari Google Apps Script
const scriptURL = 'https://script.google.com/macros/s/AKfycbxjZOrjvKUxPGxdVvbd_sdC3EvJimDvr-RTQXZxNweyWDTo0-zv21aw_Tb4sc_pHqbP8g/exec';
const orderForm = document.getElementById('orderForm');

if(orderForm) {
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const waUser = document.getElementById('whatsapp').value;
        const note = document.getElementById('note').value;
        const myNumber = "6283829458495"; // Nomor WA Anda

        // 1. Kirim Data ke Google Sheets secara background
        fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                whatsapp: waUser,
                package: currentPackage,
                note: note
            })
        })
        .then(response => console.log('Data tersimpan di Sheets!', response))
        .catch(error => console.error('Gagal simpan di Sheets', error));

        // 2. Lanjut buka WhatsApp seperti biasa
        const text = `*PESANAN BARU - INXDesignCO.*%0A%0A` +
                     `Nama: ${name}%0A` +
                     `WA Client: ${waUser}%0A`
                     `Paket: ${currentPackage}%0A` +
                     `Catatan: ${note}`;

        const url = `https://api.whatsapp.com/send?phone=${myNumber}&text=${text}`;
        window.open(url, '_blank');
        closeModal();
        orderForm.reset(); // Kosongkan form setelah kirim
    });
}

// Toggle Mobile Menu (Sederhana)
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', () => {
    alert("Fitur Menu Mobile bisa Anda kembangkan dengan menambahkan class show pada CSS!");
});

const lightbox = document.getElementById('lightbox');
const lightboxBody = document.getElementById('lightbox-body');
const lightboxCaption = document.getElementById('lightbox-caption');

// Fungsi untuk membuka detail
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', () => {
        const isVideo = item.classList.contains('video');
        const caption = item.querySelector('.overlay').innerText;
        
        lightboxBody.innerHTML = ''; // Reset konten sebelumnya

        if (isVideo) {
            // Jika video, masukkan tag video (atau iframe jika dari YouTube)
            lightboxBody.innerHTML = `
                <video controls autoplay class="animate-zoom">
                    <source src="output(compress-video-online.com) (1).mp4" type="video/mp4">
                    Browser Anda tidak mendukung video.
                </video>`;
        } else {
            // Jika gambar, ambil src dari img di dalam item
            const imgSrc = item.querySelector('img').src;
            lightboxBody.innerHTML = `<img src="${imgSrc}" class="animate-zoom">`;
        }

        lightboxCaption.innerText = caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Fungsi tutup lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxBody.innerHTML = ''; // Hentikan video saat ditutup
    document.body.style.overflow = 'auto';
}

// Fungsi Akordeon FAQ
function toggleFaq(element) {
    const parent = element.parentElement;
    
    // Tutup FAQ lain yang sedang terbuka (opsional)
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== parent) item.classList.remove('active');
    });

    // Toggle kelas active pada item yang diklik
    parent.classList.toggle('active');
}

// Tutup dengan klik di luar gambar
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

