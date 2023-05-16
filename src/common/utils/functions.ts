import moment from 'moment';

export const BASE_URL = process.env.REACT_APP_BASE_URL;
function mapModifiers(
  baseClassName: string,
  ...modifiers: (string | string[] | false | undefined)[]
): string {
  return modifiers
    .reduce<string[]>(
      (acc, m) => (!m ? acc : [...acc, ...(typeof m === 'string' ? [m] : m)]),
      [],
    )
    .map((m) => `-${m}`)
    .reduce<string>(
      (classNames, suffix) => `${classNames} ${baseClassName}${suffix}`,
      baseClassName,
    );
}

export default mapModifiers;

/*!
 * Scroll down to next block element
 */
export function scrollDownNextSection(ref: React.RefObject<HTMLDivElement>) {
  if (ref && ref.current) {
    window.scrollTo(
      { behavior: 'smooth', top: ref.current.offsetTop - 68 },
    ); // Minus header height
  }
}

/*!
 * getMousePosition(event) - cross browser normalizing of:
 * clientX, clientY, screenX, screenY, offsetX, offsetY, pageX, pageY
 * HTMLElement
 */
export function getMousePosition(
  evt:
    | React.MouseEvent<SVGPathElement, MouseEvent>
    | React.MouseEvent<SVGRectElement, MouseEvent>,
  item: HTMLDivElement,
) {
  let { pageX } = evt;
  let { pageY } = evt;
  if (pageX === undefined) {
    pageX = evt.clientX
      + document.body.scrollLeft
      + document.documentElement.scrollLeft;
    pageY = evt.clientY
      + document.body.scrollTop
      + document.documentElement.scrollTop;
  }

  const rect = item.getBoundingClientRect();
  const offsetX = evt.clientX - rect.left;
  const offsetY = evt.clientY - rect.top;

  return {
    client: { x: evt.clientX, y: evt.clientY }, // relative to the viewport
    screen: { x: evt.screenX, y: evt.screenY }, // relative to the physical screen
    offset: { x: offsetX, y: offsetY }, // relative to the event target
    page: { x: pageX, y: pageY }, // relative to the html document
  };
}

export function getDimensions(ele: HTMLDivElement) {
  const { height } = ele.getBoundingClientRect();
  const { offsetTop } = ele;
  const offsetBottom = offsetTop + height;

  return {
    height,
    offsetTop,
    offsetBottom,
  };
}

export function scrollStop(callback: (value: any) => void, time = 2000) {
  // Make sure a valid callback was provided
  if (!callback || typeof callback !== 'function') return;

  // Setup scrolling variable
  let isScrolling: any;

  // Listen for scroll events
  window.addEventListener(
    'scroll',
    () => {
      // Clear our timeout throughout the scroll
      window.clearTimeout(isScrolling);

      // Set a timeout to run after scrolling ends
      isScrolling = setTimeout(callback, time);
    },
    false,
  );
}

export const formatDateYYYYMMDD = (date?: any) => {
  if (!date) return '';
  const dateFormat = typeof (date) === 'string' ? new Date(date) : date;
  let day: string | number = moment(dateFormat).date();
  let month: string | number = moment(dateFormat).month() + 1;
  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  return `${moment(dateFormat).year()}-${month}-${day}`;
};

export const formatDateDDMMYYYY = (date?: any, unitDot?: boolean, isOverView?: boolean) => {
  if (!date) return '';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dateFormat = new Date(date);
  let day: string | number = dateFormat.getDate();
  let month: string | number = dateFormat.getMonth() + 1;
  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }

  if (unitDot) return `${day}.${month}.${dateFormat.getFullYear()}`;
  if (isOverView) return `${day} ${monthNames[dateFormat?.getMonth()]}`;
  return `${day}/${month}/${dateFormat.getFullYear()}`;
};

export function numberWithPrefix(x?: number, prefix?: string) {
  if (!x) return '-';
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, prefix || ',');
}

export function toCommas(value: string) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export const convertMonthAcronym = (value: string) => {
  switch (value) {
    case 'T1':
      return 'Tháng 1';
    case 'T2':
      return 'Tháng 2';
    case 'T3':
      return 'Tháng 3';
    case 'T4':
      return 'Tháng 4';
    case 'T5':
      return 'Tháng 5';
    case 'T6':
      return 'Tháng 6';
    case 'T7':
      return 'Tháng 7';
    case 'T8':
      return 'Tháng 8';
    case 'T9':
      return 'Tháng 9';
    case 'T10':
      return 'Tháng 10';
    case 'T11':
      return 'Tháng 11';
    case 'T12':
      return 'Tháng 12';

    default:
      return '';
  }
};

export function numberCurrencyFormatter(num: number, digits: number) {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup.slice().reverse().find((i) => num >= i.value);
  return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0';
}

export function getImageURL(imgUrl?: string) {
  if (!imgUrl) return '';
  return (BASE_URL ?? '') + imgUrl;
}

export function sortStringKey(obj: Object, reverse = false) {
  if (reverse) {
    return Object.entries(obj)
      // eslint-disable-next-line no-nested-ternary
      .sort(([keyA], [keyB]) => (keyA > keyB ? -1 : keyB > keyA ? 1 : 0))
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
  }

  return Object.entries(obj)
    // eslint-disable-next-line no-nested-ternary
    .sort(([keyA], [keyB]) => (keyA > keyB ? 1 : keyB > keyA ? -1 : 0))
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
}

export const formatHoursMinutes = (date?: string) => {
  if (!date) return '';
  const dateFormat = new Date(date);
  const h = dateFormat.getHours();
  const m = dateFormat.getMinutes();
  const hours = h >= 10 ? h : `0${h}`;
  const minutes = m >= 10 ? m : `0${m}`;
  return `${hours}h${minutes}`;
};
export const fillKPIValueChart = (val: number, length: number) => [...Array(length)].fill(val);

export function downloadFile(blob: any, filename: string) {
  if (typeof (window.navigator as any).msSaveBlob !== 'undefined') {
    (window.navigator as any).msSaveBlob(blob, filename);
    return;
  }
  const blobURL = window.URL.createObjectURL(blob);
  const tempLink = document.createElement('a');
  tempLink.style.display = 'none';
  tempLink.href = blobURL;
  tempLink.setAttribute('download', filename);
  document.body.appendChild(tempLink);
  tempLink.click();

  document.body.removeChild(tempLink);
  window.URL.revokeObjectURL(blobURL);
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
// Number(giftAllocationApiData?.remained) < 0 ? 0 : giftAllocationApiData?.remained,

export const minusRatioPercent = (ratio?: number) => {
  if (!ratio) return [100, 0];
  const minusValue = 1 - ratio;
  const abs = minusValue < 0 ? 0 : minusValue;
  return [ratio * 100, abs * 100];
};
