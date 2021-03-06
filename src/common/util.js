export const normalizeStr = (str) => {
    const betterStr = str.trim().toLowerCase();

    return betterStr.charAt(0).toUpperCase() + betterStr.slice(1);
}

export const toCurrency = (number) => {
    if (number === 0) {
        return "0";
    }

    if (number < 1000) {
        return "~0k";
    }

    const mil = Math.floor(number / 1000000);
    const thou = Math.floor((number - mil * 1000000) / 1000);
    const approximate = number - mil * 1000000 - thou * 1000;

    return `${approximate ? "~" : ""}${mil ? mil + "m" : ""}${thou ? thou + "k" : ""}`;
}

export const toTitleCase = (str) => {
    if (str.toString()) {
        return str.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
}

export const toUnsignedString = (str) => {
    const signedChars   = "àảãáạăằẳẵắặâầẩẫấậđèẻẽéẹêềểễếệìỉĩíịòỏõóọôồổỗốộơờởỡớợùủũúụưừửữứựỳỷỹýỵÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬĐÈẺẼÉẸÊỀỂỄẾỆÌỈĨÍỊÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢÙỦŨÚỤƯỪỬỮỨỰỲỶỸÝỴ";
    const unsignedChars = "aaaaaaaaaaaaaaaaadeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyAAAAAAAAAAAAAAAAADEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYY";
    const pattern = new RegExp("[" + signedChars + "]", "g");
    return output = str.replace(pattern, function (m, key, value) {
        return unsignedChars.charAt(signedChars.indexOf(m));
    });
}

export const getLocationObj = (locationStr) => {
    let location = locationStr.replace(/, /g, ',').split(',');
    return {
        street: location[location.length - 5] || '',
        ward: location[location.length - 4] || 'Ba Chieu',
        district: location[location.length - 3] || 'Binh Thanh',
        city: location[location.length - 2] || 'HCMC',
        country: location[location.length - 1] || 'Vietnam'
    }
}
