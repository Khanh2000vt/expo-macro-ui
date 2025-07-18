# Giới thiệu

`expo-macro-ui` là một thư viện react native expo chứa một số components có sẵn giúp xây dựng UI một cách nhanh chóng. Ta có thể dùng lệnh để kết xuất từng phần tử giúp không bị nặng. Ý tưởng của thư viện này dựa trên thư viện `chakra-ui`.

> ** Lưu ý:** Hướng dẫn này hướng dẫn theo dự án `expo` và `expo-router`

# Bắt đầu

**Bước 1:**
Để cài thư viện `expo-macro-ui` bạn chạy lệnh sau:

```javascript
yarn add --dev expo-macro-ui
```

**Bước 2:**
Sau đó ta chạy lệnh này để khởi tạo folder macro-ui

```javascript
expo-macro-ui add init
```

hoặc bạn có thể tạo tất cả những gì `expo-macro-ui` có bằng cách chạy

```javascript
expo-macro-ui add all
```

Khi chạy lệnh `init` hoặc `all` thì sẽ thư mục `src/macro-ui` sẽ được tạo ra.

**Bước 3:**
Điều kiện bắt buộc khi sử dụng thư viện này là phải sử dụng `react-native-unistyles`.
Cài đặt `react-native-unistyles`[ Tại đây](https://www.unistyl.es/v3/start/getting-started " Tại đây")
Sau đó làm theo hướng dẫn với expo-router [Tại đây](https://www.unistyl.es/v3/guides/expo-router)

> Với unistyles expo-router ta thay thế nội dung như sau ở file `index.ts`:

```js
import "expo-router/entry";
import "./unistyles";
```

bằng

```js
import "expo-router/entry";
import "src/macro-ui/themes/unistyles/unistyles";
```

Bạn sẽ cần thêm cả `react-native-reanimated`

giờ đã sẵn sàng rồi. Bạn xem các thành phần dưới đây

# Các thành phần

### 1. Themes

**Unstyles Config**
Thư viện rất dễ custom theo dự án, bạn có thể thay đổi unstyles config ở folder `macro-ui/themes/unistyles`

**Colors**
Các màu của dự án bạn có thể thay đổi ở file `macro-ui/themes/colors-static.ts`

**Scale**
Có cung cấp scaler, scalerAndroid, scalerDevice để tính toán size ở file `macro-ui/themes/scale.ts`
Đầu tiên bạn cần thay đổi giá trị `baseWidth` và `baseHeight` theo UI design như figma.

Cách sử dụng:

```javascript
<Box mt={scaler(10} mb={scalerDevice(20, 25)} />
```

**Shadow**
Cung cấp một số styles cho Shadow `macro-ui/themes/shadow.ts`. Bạn có thể thay đổi cho phù hợp với dự án
Cách sử dụng:

```javascript
<Box height={10} width={10} bgColor={"red"} style={shadow.primary} />
```

### 2. Global

Hãy kiểm tra file `global.constant.ts` ở trong `macro-ui/global` bạn sẽ thấy một số giá trị quen thuộc.

| Tên           | Giải thích                                                                                            |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| dimensions    | Cách loại dimensions window và screen của app                                                         |
| edgeScreen    | Lấy shorter và longer của các loại dimensions. Phù hợp với app có sử dụng cả chiều ngang và chiều dọc |
| DEVICE        | Trả ra các loại thiết bị                                                                              |
| DateVIDefault | Ngày tháng theo ngôn ngữ Việt Nam                                                                     |

**GlobalLoading**
Là 1 component được dùng với mục đính là tạo 1 lớp đủ ở ở trên cùng màn hình. Được dùng khi muốn hiện thị loading chờ hay muốn người dùng không được tác động gì khi dùng async.

Cách dùng:
Ở file `app/_layout.tsx` đối với** expo-router** hoặc `App.tsx` với cli.

```javascript
import {GlobalLoading, GlobalService} from '~/macro-ui/global';

export default function RootLayout() {
	return (
    {* Các provider của các thư viện *}
		<...>
		  <Stack />
			<GlobalLoading ref={GlobalService.globalLoadingRef} />  <--- viết ở đây
		</...>
	)
}
```

> Note: Đảm bảo `GlobalLoading` ở phía trên `Stack`.

Bây giờ bạn có thể gọi GlobalService ở bất kỳ đâu

```javascript
const Component = () => {
  return (
    <Column flex={1} gap={10}>
      <ButtonApp title="loading" onPress={() => GlobalService.loading()} />
      <ButtonApp title="overlay" onPress={() => GlobalService.overlay()} />
      <ButtonApp title="disable" onPress={() => GlobalService.disable()} />
      <ButtonApp title="hide" onPress={() => GlobalService.hide()} />
    </Column>
  );
};
```

### 3. Layout

Là thành phần chính tương tự như `View` trong `react-native`.

Hãy làm quen với thành phần `Box`.

> Mọi thuộc tính **style** của **View** sẽ là **props** của **Box** ngoại trừ **TransformsStyle, filter và boxShadow**

Ví dụ:

```javascript
<View
  styles={{
    marginTop: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    flex: 1,
    backgroundColor: "red",
  }}
/>
```

sẽ được chuyển thành

```javascript
<Box mt={10} ph={20} justify="center" flex={1} bgColor="red" />
```

Có một số thuộc tính sẽ được đổi tên ngắn gọn hơn để dễ dàng code

| Tên rút gọn | Tên đầy đủ        |
| ----------- | ----------------- |
| m           | margin            |
| mt          | marginTop         |
| mr          | marginRight       |
| me          | marginEnd         |
| mb          | marginBottom      |
| ml          | marginLeft        |
| ms          | marginStart       |
| mv          | marginVertical    |
| mh          | marginHorizontal  |
| p           | padding           |
| pt          | paddingTop        |
| pr          | paddingRight      |
| pe          | paddingEnd        |
| pb          | paddingBottom     |
| pl          | paddingLeft       |
| ps          | paddingStart      |
| pv          | paddingVertical   |
| ph          | paddingHorizontal |
| maxH        | maxHeight         |
| maxW        | maxWidth          |
| minH        | minHeight         |
| minW        | minWidth          |
| align       | alignItems        |
| justify     | justifyContent    |
| bgColor     | backgroundColor   |

Tương tự như `Box`, trong layout cũng cung cấp một số layout khác dựa trên `Box` để code UI nhanh chóng

| Thành phần              | Style mặc định sẵn                                                                |
| ----------------------- | --------------------------------------------------------------------------------- |
| Absolute                | position="absolute"                                                               |
| AbsoluteCenter          | position="absolute" justify="center" align="center"                               |
| BoxSafeAreaBottom       | bgColor={colors.white} p={scaler(16)} pb={Math.max(rt.insets.bottom, scaler(16))} |
| Center                  | justify="center" align="center"                                                   |
| Column                  | align="center" flexDirection="column"                                             |
| Row                     | align="center" flexDirection="row"                                                |
| Wrap                    | flexDirection="row" flexWrap="wrap"                                               |
| BoxAnimated             | Animated.createAnimatedComponent(Box)                                             |
| BoxAnimatedFade         | entering={FadeIn} exiting={FadeOut}                                               |
| BoxHideKeyboard         | dùng Pressable                                                                    |
| BoxHideKeyboardAnimated | tương tự như BoxAnimated                                                          |

Một số thành phần khác trong layout:

**For**
Tương tự với phương thức **map** trong **array**
Cách sử dụng:

```javascript
{DATA?.map((item, index) => (
	<Box key={index}>
	 	<TextApp>{item} - {index}</TextApp>
	</Box>))}

<For each={DATA}>
	{(item, index) => (
	 	<Box key={index}>
	 		<TextApp>{item} - {index}</TextApp>
	 	</Box>
	}
</For>
```

| Props    | Type                                                    | Require? | Giải thích             |
| -------- | ------------------------------------------------------- | -------- | ---------------------- |
| each     | T[] \ undefined                                         | yes      | Mảng array để map      |
| children | (item: T, index: number, array: T[]) => React.ReactNode | yes      | UI từng item của array |

**Show**
Tương tự điều kiện 3 ngôi `<boolean> ? <true> : <false>`

```javascript
{
  isShow ? <ShowComponent /> : null;
}

<Show when={isShow}>
  <ShowComponent />
</Show>;

{
  isShow ? <ShowComponent /> : <HideComponent />;
}

<Show when={isShow} fallback={<HideComponent />}>
  <ShowComponent />
</Show>;
```

| Props    | Type                       | Require? | Giải thích                                                                       |
| -------- | -------------------------- | -------- | -------------------------------------------------------------------------------- |
| when     | boolean \ undefined \ null | yes      | Điều kiện hiển thị **children** của **Show**                                     |
| fallback | React.ReactNode            | no       | Sẽ hiển thị nếu **when** là **false**, nếu không truyền thì mặc định là **null** |

### 4. Typography

**TextApp**
Tương tự như **Box**. style của **Text** sẽ được **TextApp** chuyển thành props.
Ví dụ

```javascript
<Text style={{fontSize: 12, color: 'red'}}>Macro - UI<Text>

	// Sẽ chuyển thành

<TextApp size={12} color='red'>Macro - UI</TextApp>
```

**Custom Font**
Muốn thêm font vào trong **TextApp** bạn sẽ sửa `fontMap` trong `macro-ui/typography/typography.func.ts`

```javascript
const fontMap: { [key: string]: { normal: string, italic: string } } = {
  300: { normal: "WorkSans-Light", italic: "WorkSans-LightItalic" },
  400: { normal: "WorkSans-Regular", italic: "WorkSans-Italic" },
  500: { normal: "WorkSans-Medium", italic: "WorkSans-MediumItalic" },
  600: { normal: "WorkSans-SemiBold", italic: "WorkSans-SemiBoldItalic" },
  700: { normal: "WorkSans-Bold", italic: "WorkSans-BoldItalic" },
  800: { normal: "WorkSans-ExtraBold", italic: "WorkSans-ExtraBoldItalic" },
};
```

> Đặc biệt: **TextApp** có thêm thuộc tính **type** để bạn tạo nhanh chóng **style** cho **TextApp**.

**Cách thêm và sửa `type` trong `TextApp`:**
Đầu tiên: Muốn thêm thuộc tính type bạn sửa `TextType` trong file `macro-ui/typography/typography.type.ts`.
Sau đó: Bạn sẽ thêm style của `type` trong `variants` ở function `getStyleTypography` trong file `macro-ui/typography/typography.func.ts`

```javascript
export const getStyleTypography = (
  props: TypographyStyleType,
  colors: Record<string, string>
): any => {
	...
	return {
		...
		variants: {
			type: {
				...,
				[Tên type của bạn]: {
					//Style của bạn
				}
			}
		}
	}
}
```

### 5. Components

Bạn muốn dùng component nào thì sẽ chạy lệnh với code tương ứng
Ví dụ:

```
expo-macro-ui add button // Thêm component ButtonApp vào macro-ui
expo-macro-ui add text_ticker // Thêm component TextTickerApp vào macro-ui

```

| Code               | Tên component        | Mô tả                                                                                                       | Phụ thuộc                                                                                                                             |
| ------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| all                | -                    | Cài tất cả macro-ui                                                                                         | \_                                                                                                                                    |
| init               | -                    | Khởi tạo thư viện macro-ui                                                                                  | -                                                                                                                                     |
| text_ticker        | TextTickerApp        | Là `TextTicker` của thư viện `react-native-text-ticker` nhưng style sẽ được chuyển thành props như TextApp. | Package: `react-native-text-ticker`                                                                                                   |
| avatar             | Avatar               | Được sử dụng để biểu diễn hình ảnh hồ sơ người dùng hoặc chữ cái đầu                                        | Component: `ImageApp`                                                                                                                 |
| badge              | Badge                | Được sử dụng để làm nổi bật trạng thái của một mục để nhận dạng nhanh                                       | -                                                                                                                                     |
| blur               | BlurApp              | Là `BlurView` nhưng style là props                                                                          | package `expo-blur`                                                                                                                   |
| button             | ButtonApp            | Button của app                                                                                              | component `ActivityIndicatorApp` và `PressableApp`                                                                                    |
| card               | Card                 | Thường được dùng để bọc vào item của list                                                                   | component `PressableApp`                                                                                                              |
| card_box           | CardBox              | Box có hiệu ứng như `Badge` và `ButtonApp`                                                                  | -                                                                                                                                     |
| checkbox           | Checkbox             | Tất nhiên là Checkbox rồi                                                                                   | component `PressableApp` <br> package `@expo/vector-icons`                                                                            |
| circle             | Circle               | Tạo hình tròn                                                                                               | -                                                                                                                                     |
| collapsible        | Collapsible          | Được sử dụng để mở rộng và thu gọn nội dung bổ sung.                                                        | component `TextTickerApp`, `PressableApp`<br>Package `@expo/vector-icons`                                                             |
| empty_state        | EmptyState           | Hiển thị nội dung khi list rỗng                                                                             | -                                                                                                                                     |
| error_state        | ErrorState           | Hiện thị nội dung khi bị lỗi                                                                                | -                                                                                                                                     |
| input              | Input và Editable    | Là Input app                                                                                                | Component: `PressableApp`<br>Package: `@expo/vector-icons` và `@gorhom/bottom-sheet`                                                  |
| modal              | ModalApp             | ModalApp                                                                                                    | Component: `PressableApp`, `Separator`<br>Package: `react-native-modal`, `@expo/vector-icons`                                         |
| parallax_scroll    | ParallaxScrollView   | ParallaxScrollView                                                                                          | -                                                                                                                                     |
| pressable          | PressableApp         | Pressable của react native                                                                                  | -                                                                                                                                     |
| progress_circle    | ProgressCircle       | Progress theo hình tròn                                                                                     | Package: `react-native-svg`, `react-native-reanimated`                                                                                |
| radio              | Radio                | Radio                                                                                                       | -                                                                                                                                     |
| scroll_page        | ScrollPage           | ScrollView của screen có thể refresh                                                                        | Package: `react-native-keyboard-controller`<br>Component: `ActivityIndicatorApp`, `ErrorState`                                        |
| select             | Select               | Được sử dụng để chọn một giá trị từ các tùy chọn được xác định trước                                        | Package: `@gorhom/bottom-sheet`, `@expo/vector-icons`<br>Component: `BottomSheetApp`, `PressableApp`, `Input`, `Switch`, `EmptyState` |
| separator          | Separator            | Được sử dụng để riêng biệt trực quan                                                                        | -                                                                                                                                     |
| switch             | Switch               | Được sử dụng để nắm bắt trạng thái nhị phân                                                                 | Component: `PressableApp`                                                                                                             |
| tabs               | Tabs                 | Được sử dụng để hiển thị nội dung trong giao diện được tab                                                  | Package: `react-native-tab-view`, Component: `ActivityIndicatorApp`                                                                   |
| textarea           | Textarea             | Tương tự như `Input`                                                                                        | Tương tự như `Input`                                                                                                                  |
| touchable          | TouchableApp         | TouchableOpacity của react native                                                                           | -                                                                                                                                     |
| activity_indicator | ActivityIndicatorApp | ActivityIndicator của react native                                                                          | -                                                                                                                                     |
| bottom_sheet       | BottomSheetApp       | -                                                                                                           | Package: `@gorhom/bottom-sheet`                                                                                                       |
| forms              | FormApp              | Viết forms bằng mảng object js                                                                              | Package: `react-hook-form`                                                                                                            |
| accordion          | Accordion            | Accordion                                                                                                   | Component: `PressableApp`                                                                                                             |
| -                  | Toasts               | Toasts                                                                                                      | Package: `@backpackapp-io/react-native-toast`                                                                                         |
| modal-confirm      | ModalConfirm         | ModalConfirm                                                                                                | Components: `ModalAp`, `ButtonApp`<br> Package: `@expo/vector-icons`                                                                  |
| contacts           | ContactsPicker       | ContactsPicker                                                                                              | Package: `@gorhom/bottom-sheet`, `expo-contacts`, `expo-linking`<br>Components: `ModalConfirm`, `PressableApp`, `Separator`           |

### 5. FormsApp

**Cấu trúc:**

- fields: Chứa các field của forms

**Cách mở rộng các field của `FormsApp`**
Vì FormsApp không thể kiểm soát được hết các case forms nên bạn có thể mở rộng theo các bước sau

> Note: Giả sử bạn muốn thêm 1 filed là `Calendar`

**Bước 1: Update type field form**
Trong file `form.type.ts` cập nhật `FormAppType`:

```javascript
export type FormAppType =
  | 'input'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'select'
  | 'textarea'
  | 'text'
  | 'calendar'; <--- Thêm vào đây
```

**Bước 2: Tạo type của field của bạn:**
Vẫn ở file `form.type.ts` tạo thêm type field của bạn:

```javascript
export type CalendarFieldType<T extends FieldValues> = BaseFormField<
  T,
  'calendar'   // đúng như type FormAppType đã khai báo
> & CalendarProps // props thêm tuỳ theo bạn
```

> Note: Quy tắc đặt tên type field là [Tên Field]FieldType cho đồng bộ

**Bước 3: Cập nhật vào FormFieldType**
Ta cập nhật

```javascript
export type FormFieldType<T extends FieldValues> = ... | CalendarFieldType<T>;
```

Đã xong phần khai báo. Giờ ta vào folder `fields` để tạo 1 component `CalendarField`.
Tất cả **Field** đều có props là `FormFieldProps<T>`
Sau khi tạo xong `CalendarField` thì bạn chỉ cần vào file `FormApp/index.tsx` cập nhật trong switch case tương ứng

> Note: FormsApp có sẵn các filed có trong components. Nếu bạn không chạy` expo-macro-ui add` thì có thể bị lỗi không tìm thấy component. Nếu dự án không cần dùng đến những fields nào bạn có thể xoá bỏ.

- Tham khảo thêm forms-app trên github: [Forms-App](https://github.com/Khanh2000vt/expo-macro-ui/tree/main/templates/forms)
