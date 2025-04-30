export function vypocetSeznamu(pocetNoci, zakladniSeznam) {
    return zakladniSeznam.map((polozka) => {
      return {
        ...polozka,
        mnozstvi: polozka.zavisleNaNocich ? pocetNoci + 1 : polozka.mnozstvi
      };
    });
  }
  