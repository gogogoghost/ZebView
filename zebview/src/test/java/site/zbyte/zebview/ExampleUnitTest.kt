package site.zbyte.zebview

import android.util.Base64
import org.junit.Test

import org.junit.Assert.*
import java.io.ByteArrayOutputStream

/**
 * Example local unit test, which will execute on the development machine (host).
 *
 * See [testing documentation](http://d.android.com/tools/testing).
 */
class ExampleUnitTest {
    @Test
    fun addition_isCorrect() {
        val out=ByteArrayOutputStream()
        out.writeBytes(byteArrayOf(0x55,0x66,0x77,0x05))
        println(out.toByteArray().toStr())
    }
}