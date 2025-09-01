// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
    
    // 네비게이션 관련 기능
    initNavigation();
    
    // FAQ 아코디언 기능
    initFAQ();
    
    // 모바일 메뉴 기능
    initMobileMenu();
    
    // 스크롤 애니메이션
    initScrollAnimations();
    
    // 부드러운 스크롤
    initSmoothScroll();
    
    // 부서별 탭 기능
    initDepartmentTabs();
    
    // 검색 기능 (선택사항)
    initSearch();
    
    // 테마 전환 (선택사항)
    initThemeToggle();
});

/**
 * 네비게이션 기능 초기화
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('.content-section');
    
    // 네비게이션 클릭 이벤트
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSectionId = this.getAttribute('data-section');
            
            // 모든 네비게이션 링크에서 active 클래스 제거
            navLinks.forEach(nav => nav.classList.remove('active'));
            
            // 모든 섹션 숨기기
            sections.forEach(section => section.classList.remove('active'));
            
            // 클릭된 링크에 active 클래스 추가
            this.classList.add('active');
            
            // 해당 섹션 표시
            const targetSection = document.getElementById(targetSectionId);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // 섹션으로 부드럽게 스크롤 (모바일에서)
                if (window.innerWidth <= 1024) {
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // 모바일에서 메뉴 닫기
                    closeMobileMenu();
                }
            }
            
            // URL 업데이트 (새로고침 없이)
            history.pushState(null, null, `#${targetSectionId}`);
        });
    });
    
    // 페이지 로드 시 URL 해시에 따라 섹션 표시
    const hash = window.location.hash.substring(1);
    if (hash) {
        const targetLink = document.querySelector(`[data-section="${hash}"]`);
        const targetSection = document.getElementById(hash);
        
        if (targetLink && targetSection) {
            // 모든 링크와 섹션에서 active 제거
            navLinks.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // 해당 링크와 섹션을 active로 설정
            targetLink.classList.add('active');
            targetSection.classList.add('active');
        }
    } else {
        // 기본적으로 첫 번째 섹션 표시
        if (navLinks.length > 0 && sections.length > 0) {
            navLinks[0].classList.add('active');
            sections[0].classList.add('active');
        }
    }
}

/**
 * FAQ 아코디언 기능 초기화
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // 모든 FAQ 아이템 닫기
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // 클릭한 아이템이 닫혀있었다면 열기
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/**
 * 모바일 메뉴 기능 초기화
 */
function initMobileMenu() {
    // 메뉴 토글 버튼 생성
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.setAttribute('aria-label', '메뉴 열기');
    document.body.appendChild(menuToggle);
    
    const sidebar = document.querySelector('.sidebar');
    
    // 메뉴 토글 클릭 이벤트
    menuToggle.addEventListener('click', function() {
        const isOpen = sidebar.classList.contains('open');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    // 사이드바 외부 클릭 시 메뉴 닫기
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 1024) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });
    
    // ESC 키로 메뉴 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
}

/**
 * 모바일 메뉴 열기
 */
function openMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    
    sidebar.classList.add('open');
    menuToggle.innerHTML = '✕';
    menuToggle.setAttribute('aria-label', '메뉴 닫기');
    document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
}

/**
 * 모바일 메뉴 닫기
 */
function closeMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    
    sidebar.classList.remove('open');
    menuToggle.innerHTML = '☰';
    menuToggle.setAttribute('aria-label', '메뉴 열기');
    document.body.style.overflow = ''; // 스크롤 복원
}

/**
 * 스크롤 애니메이션 초기화
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.intro-card, .benefit-item, .category-card, .tip-card, .best-practice-item');
    
    // Intersection Observer로 요소가 화면에 나타날 때 애니메이션 실행
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

/**
 * 부드러운 스크롤 초기화
 */
function initSmoothScroll() {
    // CSS에서 이미 처리되지만, 추가적인 부드러운 스크롤 효과
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * 부서별 탭 기능 초기화
 */
function initDepartmentTabs() {
    // 부서별 탭 전환 함수를 전역으로 등록
    window.showDepartment = function(deptId) {
        // 모든 탭 비활성화
        const tabs = document.querySelectorAll('.dept-tab');
        tabs.forEach(tab => tab.classList.remove('active'));
        
        // 모든 부서 섹션 숨기기
        const sections = document.querySelectorAll('.dept-section');
        sections.forEach(section => section.classList.remove('active'));
        
        // 클릭된 탭 활성화
        const activeTab = document.querySelector(`[onclick="showDepartment('${deptId}')"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        // 해당 부서 섹션 표시
        const activeSection = document.getElementById(`${deptId}-dept`);
        if (activeSection) {
            activeSection.classList.add('active');
        }
    };
    
    // 초기 로드 시 첫 번째 탭 활성화
    const firstTab = document.querySelector('.dept-tab');
    if (firstTab) {
        firstTab.click();
    }
}

/**
 * 검색 기능 초기화 (선택사항)
 */
function initSearch() {
    // 검색 기능은 필요시 구현
    // 현재는 기본 구조만 제공
    
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(this.value.trim().toLowerCase());
        }, 300);
    });
}

/**
 * 검색 실행
 */
function performSearch(query) {
    if (!query) {
        // 검색어가 없으면 모든 섹션 표시
        showAllSections();
        return;
    }
    
    const sections = document.querySelectorAll('.content-section');
    let hasResults = false;
    
    sections.forEach(section => {
        const text = section.textContent.toLowerCase();
        if (text.includes(query)) {
            section.style.display = 'block';
            hasResults = true;
            
            // 검색 결과 하이라이트 (선택사항)
            highlightSearchTerm(section, query);
        } else {
            section.style.display = 'none';
        }
    });
    
    // 검색 결과가 없을 때 메시지 표시
    if (!hasResults) {
        showNoResultsMessage();
    }
}

/**
 * 모든 섹션 표시
 */
function showAllSections() {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'block';
        removeHighlight(section);
    });
    hideNoResultsMessage();
}

/**
 * 검색어 하이라이트
 */
function highlightSearchTerm(element, term) {
    // 기본적인 하이라이트 기능
    // 더 정교한 하이라이트가 필요하면 라이브러리 사용 권장
}

/**
 * 하이라이트 제거
 */
function removeHighlight(element) {
    // 하이라이트 제거 로직
}

/**
 * 검색 결과 없음 메시지 표시
 */
function showNoResultsMessage() {
    let noResultsDiv = document.getElementById('no-results');
    if (!noResultsDiv) {
        noResultsDiv = document.createElement('div');
        noResultsDiv.id = 'no-results';
        noResultsDiv.className = 'no-results-message';
        noResultsDiv.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: #666;">
                <div style="font-size: 4rem; margin-bottom: 20px;">🔍</div>
                <h3>검색 결과가 없습니다</h3>
                <p>다른 검색어로 시도해 보세요</p>
            </div>
        `;
        document.querySelector('.main-content').appendChild(noResultsDiv);
    }
    noResultsDiv.style.display = 'block';
}

/**
 * 검색 결과 없음 메시지 숨기기
 */
function hideNoResultsMessage() {
    const noResultsDiv = document.getElementById('no-results');
    if (noResultsDiv) {
        noResultsDiv.style.display = 'none';
    }
}

/**
 * 테마 전환 기능 초기화 (선택사항)
 */
function initThemeToggle() {
    // 다크 모드 토글 기능은 필요시 구현
    // 현재는 기본 구조만 제공
    
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // 저장된 테마 설정 불러오기
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

/**
 * 테마 적용
 */
function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
        themeToggle.setAttribute('aria-label', 
            theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'
        );
    }
}

/**
 * 윈도우 리사이즈 이벤트 처리
 */
window.addEventListener('resize', function() {
    // 데스크톱으로 전환 시 모바일 메뉴 닫기
    if (window.innerWidth > 1024) {
        closeMobileMenu();
    }
});

/**
 * 브라우저 뒤로가기/앞으로가기 처리
 */
window.addEventListener('popstate', function() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const targetLink = document.querySelector(`[data-section="${hash}"]`);
        if (targetLink) {
            targetLink.click();
        }
    }
});

/**
 * 페이지 로딩 상태 관리
 */
function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading';
    loadingDiv.className = 'loading-overlay';
    loadingDiv.innerHTML = `
        <div class="loading-spinner">
            <div class="loading"></div>
            <p>로딩 중...</p>
        </div>
    `;
    document.body.appendChild(loadingDiv);
}

function hideLoading() {
    const loadingDiv = document.getElementById('loading');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

/**
 * 에러 처리
 */
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #e74c3c;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 300px;
    `;
    errorDiv.textContent = message;
    
    document.body.appendChild(errorDiv);
    
    // 3초 후 자동 제거
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 3000);
}

/**
 * 성공 메시지 표시
 */
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2ecc71;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 300px;
    `;
    successDiv.textContent = message;
    
    document.body.appendChild(successDiv);
    
    // 3초 후 자동 제거
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 3000);
}

/**
 * 유틸리티 함수들
 */

// 디바운스 함수
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 스로틀 함수
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

// 로컬 스토리지 헬퍼
const storage = {
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('로컬 스토리지 저장 실패:', e);
        }
    },
    
    get: function(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.warn('로컬 스토리지 읽기 실패:', e);
            return defaultValue;
        }
    },
    
    remove: function(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn('로컬 스토리지 삭제 실패:', e);
        }
    }
};

// 접근성 개선
function enhanceAccessibility() {
    // 키보드 네비게이션 개선
    document.addEventListener('keydown', function(e) {
        // Tab 키로 포커스 이동 시 스타일 개선
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // 스크린 리더를 위한 라이브 영역 설정
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    `;
    document.body.appendChild(liveRegion);
    
    window.announceToScreenReader = function(message) {
        liveRegion.textContent = message;
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    };
}

// 페이지 로드 완료 후 접근성 개선 실행
document.addEventListener('DOMContentLoaded', enhanceAccessibility);

// 성능 모니터링 (개발용)
if (window.performance && window.performance.mark) {
    performance.mark('manual-script-loaded');
}

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

console.log('🤖 GS MISO AI 플랫폼 사용 가이드가 로드되었습니다!');
console.log('🏠 미소AI 소개 섹션에서 안전한 사내 AI 서비스의 특징을 확인하세요.');
console.log('📱 모바일에서는 왼쪽 상단 메뉴 버튼을 눌러 네비게이션을 이용하세요.');
console.log('🏢 부서별 활용 사례에서 탭을 클릭하여 부서별 가이드를 확인할 수 있습니다.');
console.log('❓ FAQ 섹션에서 자주 묻는 질문들을 확인할 수 있습니다.');