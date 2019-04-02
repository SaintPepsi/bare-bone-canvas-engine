Utils = {

    lerp: function(a, b, factor = 0.5) {

        return a + (b - a) * factor;

    },

    modulo: function(value, max) {

        if (value >= 0) return value % max;
        else return max + (value % max);

        return value;

    },

    wrappedDistance: function(value, target, max) {

        let diff = (target - value + max / 2) % max - max / 2;

        return diff < -max / 2 ? diff + max : diff;

    },

    lookAt: function(x1, y1, x2, y2) {

        let result = Math.atan2(y2 - y1, x2 - x1);

        return this.modulo(result, Math.PI * 2);

    },
    rotate: function(pointX, pointY, originX, originY, angle) {

        return [
            originX + (pointX - originX) * Math.cos(angle) - (pointY - originY) * Math.sin(angle),
            originY + (pointX - originX) * Math.sin(angle) + (pointY - originY) * Math.cos(angle)
        ];

    },
    map: function(n, start1, stop1, start2, stop2, withinBounds) {
        var newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
        if (!withinBounds) {
            return newval;
        }
        if (start2 < stop2) {
            return this.constrain(newval, start2, stop2);
        } else {
            return this.constrain(newval, stop2, start2);
        }
    },
    constrain: function(n, low, high) {
        return Math.max(Math.min(n, high), low);
    },
    distance: function(x1, y1, x2, y2) {
        var a = x1 - x2;
        var b = y1 - y2;

        return Math.sqrt(a * a + b * b);
        // c is the distance
    },
    random: function(min, max) {
        var rand;

        rand = Math.random();
        if (typeof min === 'undefined') {
            return rand;
        } else if (typeof max === 'undefined') {
            if (min instanceof Array) {
                return min[Math.floor(rand * min.length)];
            } else {
                return rand * min;
            }
        } else {
            if (min > max) {
                var tmp = min;
                min = max;
                max = tmp;
            }

            return rand * (max - min) + min;
        }
    },





    wrap: function(value, min, max) {
        if (value < min) return max + (value % max);
        if (value >= max) return value % max;
        return value;
    },

    wrapTo: function(value, target, max, step) {

        if (value === target) return target;

        var result = value;

        var d = this.wrappedDistance(value, target, max);

        if (Math.abs(d) < step) return target;

        result += (d < 0 ? -1 : 1) * step;

        if (result > max) {

            result = result - max;

        } else if (result < 0) {

            result = max + result;

        }

        return result;

    },
    circWrap: function(val) {

        return this.wrap(val, 0, Math.PI * 2);

    },
    circWrapTo: function(value, target, step) {

        return this.wrapTo(value, target, Math.PI * 2, step);

    },

    vectorLimit: function(x, y, max) {
        var mSq = this.vectorMagSq(x, y);
        var limited = {
            x: x,
            y: y
        };
        if (mSq > max * max) {
            let div = this.vectorDivide(x, y, Math.sqrt(mSq)) //normalize it
            limited = this.vectorMultiply(div.x, div.y, max);
        }
        return limited;
    },
    vectorMagSq: function(x, y) {
        return x * x + y * y;
    },
    vectorDivide: function(x, y, n) {
        if (!(typeof n === 'number' && isFinite(n))) {
            console.warn(
                'vectorDivide:',
                'n is undefined or not a finite number'
            );
            return {
                x: x,
                y: y
            };
        }
        if (n === 0) {
            console.warn('vectorDivide', 'divide by 0');
            return {
                x: x,
                y: y
            };
        }
        return {
            x: x / n,
            y: y / n,
        };
    },
    vectorMultiply: function(x, y, n) {
        if (!(typeof n === 'number' && isFinite(n))) {
            console.warn(
                'vectorMultiply',
                'n is undefined or not a finite number'
            );
            return {
                x: x,
                y: y
            };
        }
        return {
            x: x * n,
            y: y * n
        };
    },
    domIndex: function(elm) {
        var nodes = elm.parentNode.childNodes,
            node;
        var i = count = 0;
        while ((node = nodes.item(i++)) && node != elm) {
            if (node.nodeType == 1) count++;
        }
        return count;
    },
    randomFromObject: function(obj) {
        var keys = Object.keys(obj)
        return obj[keys[keys.length * Math.random() << 0]];
    },

    moveTo: function(value, target, step) {


        if (value < target) {
            value += step;
            if (value > target) value = target;
        }

        if (value > target) {
            value -= step;
            if (value < target) value = target;
        }

        return value;

    },

}
