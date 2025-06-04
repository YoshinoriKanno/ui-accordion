document.addEventListener('DOMContentLoaded', function () {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  const mediaQuery = window.matchMedia('(max-width: 768px)'); // デバイス幅が768px未満の場合

  function toggleAccordion(event) {
    const item = event.target.closest('.accordion-item');
    const content = event.target.nextElementSibling;

    if (item && content) {
      // アコーディオンのアイテムに is-open クラスを追加/削除
      if (item.classList.contains('is-open')) {
        item.classList.remove('is-open');
        content.style.maxHeight = '0'; // 閉じる際に max-height を 0 に設定
      } else {
        item.classList.add('is-open');
        content.style.maxHeight = content.scrollHeight + 'px'; // 開いたときにコンテンツの高さに設定
      }
    }
  }

  // メディアクエリがマッチしたときのみアコーディオン機能を有効にする
  function setupAccordion() {
    if (mediaQuery.matches) {
      // 768px未満の場合、クリックイベントを有効化し、max-height を設定
      accordionHeaders.forEach(header => {
        header.addEventListener('click', toggleAccordion);
      });
      const items = document.querySelectorAll('.accordion-item');
      items.forEach(item => {
        const content = item.querySelector('.accordion-content');
        if (content) {
          content.style.maxHeight = '0'; // 初期状態で閉じる
        }
      });
    } else {
      // 768px以上の場合、クリックイベントを無効化し、max-height を解除
      accordionHeaders.forEach(header => {
        header.removeEventListener('click', toggleAccordion);
      });

      const items = document.querySelectorAll('.accordion-item');
      items.forEach(item => {
        item.classList.add('is-open'); // is-open クラスを強制的に追加
        const content = item.querySelector('.accordion-content');
        if (content) {
          content.style.maxHeight = 'none'; // 768px 以上では max-height を適用しない
        }
      });
    }
  }

  // mediaQueryの変更を監視してアコーディオンの状態を更新
  mediaQuery.addEventListener('change', setupAccordion);

  // 初期状態を設定
  setupAccordion();
});
