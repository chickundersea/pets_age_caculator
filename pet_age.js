// 設定日期選擇器的最大日期為今天
const today = new Date().toISOString().split('T')[0];
document.getElementById('cat-birth').setAttribute('max', today);
document.getElementById('dog-birth').setAttribute('max', today);

// 頁籤切換
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        const petType = this.getAttribute('data-pet');
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(petType + '-content').classList.add('active');
        
        // 切換參考資料來源
        document.querySelectorAll('.reference-content').forEach(ref => {
            ref.classList.remove('active');
        });
        document.getElementById(petType + '-reference').classList.add('active');
    });
});

function calculateAge(birthDate) {
    const birth = new Date(birthDate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    
    if (months < 0 || (months === 0 && today.getDate() < birth.getDate())) {
        years--;
        months += 12;
    }
    
    if (today.getDate() < birth.getDate()) {
        months--;
    }
    
    return {
        years: years,
        months: months,
        totalYears: years + months / 12
    };
}

function calculateCatAge() {
    const name = document.getElementById('cat-name').value.trim();
    const birthDate = document.getElementById('cat-birth').value;
    
    // 清除之前的錯誤訊息
    document.getElementById('cat-name-error').style.display = 'none';
    document.getElementById('cat-birth-error').style.display = 'none';
    
    let hasError = false;
    
    if (!name) {
        document.getElementById('cat-name-error').style.display = 'block';
        hasError = true;
    }
    
    if (!birthDate) {
        document.getElementById('cat-birth-error').style.display = 'block';
        hasError = true;
    }
    
    if (hasError) return;
    
    const age = calculateAge(birthDate);
    let humanAge;
    
    // 貓年齡換算公式
    if (age.totalYears < 1) {
        humanAge = Math.round(age.totalYears * 15);
    } else if (age.totalYears < 2) {
        humanAge = 15 + Math.round((age.totalYears - 1) * 9);
    } else {
        humanAge = 24 + Math.round((age.totalYears - 2) * 4);
    }
    
    const resultDiv = document.getElementById('cat-result');
    const resultText = document.getElementById('cat-result-text');
    
    let ageStr = age.years + '歲';
    if (age.months > 0) {
        ageStr += age.months + '個月';
    }
    
    resultText.innerHTML = `
        <span class="highlight">${name}</span> 已經 <span class="highlight">${ageStr}</span> 囉，<br>
        換算成人類年紀是 <span class="highlight">${humanAge}歲</span>。
    `;
    
    resultDiv.classList.add('show');
}

function calculateDogAge() {
    const name = document.getElementById('dog-name').value.trim();
    const birthDate = document.getElementById('dog-birth').value;
    
    // 清除之前的錯誤訊息
    document.getElementById('dog-name-error').style.display = 'none';
    document.getElementById('dog-birth-error').style.display = 'none';
    
    let hasError = false;
    
    if (!name) {
        document.getElementById('dog-name-error').style.display = 'block';
        hasError = true;
    }
    
    if (!birthDate) {
        document.getElementById('dog-birth-error').style.display = 'block';
        hasError = true;
    }
    
    if (hasError) return;
    
    const age = calculateAge(birthDate);
    let humanAge;
    
    // 狗年齡換算公式（使用 AVMA 建議）
    if (age.totalYears < 1) {
        humanAge = Math.round(age.totalYears * 15);
    } else if (age.totalYears < 2) {
        humanAge = 15 + Math.round((age.totalYears - 1) * 9);
    } else {
        humanAge = 24 + Math.round((age.totalYears - 2) * 5);
    }
    
    const resultDiv = document.getElementById('dog-result');
    const resultText = document.getElementById('dog-result-text');
    
    let ageStr = age.years + '歲';
    if (age.months > 0) {
        ageStr += age.months + '個月';
    }
    
    resultText.innerHTML = `
        <span class="highlight">${name}</span> 已經 <span class="highlight">${ageStr}</span> 囉，<br>
        換算成人類年紀是 <span class="highlight">${humanAge}歲</span>。
    `;
    
    resultDiv.classList.add('show');
}