function counter() {
    let count = 0;

    return function () {
        count++;
        console.log(count);
    };
}

const a = counter();

a();
a();
a();

const b = counter();
b();