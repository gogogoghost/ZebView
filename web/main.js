import { connect } from './lib/zeb'

const api = await connect()
console.log(api)

function $ () {
    return document.querySelector(...arguments)
}

$('#getAge').onclick = async () => {
    console.log(await api.TestService.age.get())
}
$('#addAge').onclick = async () => {
    console.log(await api.TestService.ageAdd())
}
$('#callObj').onclick = async () => {
    const obj = await api.TestService.getInnerObject()
    console.log(await obj.innerFunction())
}

async function complexCall () {
    const res = await api.TestService.testType(
        0xff,
        0x5555555555,
        -10.24,
        "Hell\0world",
        false,
        new Uint8Array([0x5f, 0x68]).buffer,
        null,
        { name: 'Jack', age: 18 },
        [
            "Don't worry",
            { price: 100 },
            [-100, 200, -300],
            "Be Happy"
        ],
        function () {
            console.log(arguments)
            return "Yes Please"
        },
        {
            done: async (txt) => {
                console.log(txt)
                return 999
            }
        }
    )
    console.log(res)
}

$('#testType').onclick = async () => {
    window.start = new Date().getTime()
    await complexCall()
    console.log("time:", new Date().getTime() - window.start)
}
$('#start').onclick = async () => {
    await api.TestService.startThread(10, 3000, {
        exec () {
            console.log('exec')
        },
        timeout () {
            console.warn('timeout')
        }
    })
}
$('#stop').onclick = async () => {
    console.log('stop start')
    await api.TestService.stopThread()
    console.log('stop end')
}
let blobName = null
let count = 48
$('#postBlob').onclick = async () => {
    //hello world:0
    const data = new Uint8Array([0x48, 0x65, 0x6C, 0x6C, 0x6F, 0x20, 0x77, 0x6F, 0x72, 0x6C, 0x64, 0x3a, 0])
    data[data.length - 1] = count
    count++
    if (count >= 58) {
        count = 48
    }
    blobName = await api.TestService._zeb.postBlob(data)
    console.log(blobName)
}
$('#getBlob').onclick = async () => {
    if (!blobName) {
        console.error("please post blob first")
        return
    }
    console.log(await (await api.TestService._zeb.getBlob(blobName)).text())
}