# Intro
개인적으로 이것저것 만들어볼 때 사용 할 디자인 시스템.

MUI의 동작 방식에 대한 이해도 할 겸, 직접 구현 해 본다.

# 목표
오픈소스나 상용 서비스가 아닌 개인 사용이 목적이기 때문에 철저히 주관적인 견해와 취향이 들어간다.

욕심으로는 그럴듯하게 제작하고 범용성 있게 만들고 싶지만 한정적인 리소스로는 한계가 분명하고 만족할만한 퀄리티를 뽑아 낼 자신이 없다.

## 컴포넌트 리스트
- [ ] Button
- [ ] ButtonGroup
- [ ] Select
- [ ] Switch
- [ ] Checkbox
- [ ] Radio Group
- [ ] TextField
- [ ] Icon
- [ ] Tooltip
- [ ] Chip
- [ ] Table
- [ ] Typography
- [ ] Dialog
- [ ] Progress
- [ ] Skeleton
- [ ] Pagination
- [ ] Container
- [ ] Grid
- [ ] Stack

# 고민들
## 240724

MUI 방식 처럼 만들고 싶다..

기본적으로 `StyledComponent`를 사용하고, 해당 라이브러리를 사용하는 곳에서 입맞에 맞게 커스텀이 가능 하도록. 그러려면 styled 함수를 Custom 해서 사용해야한다.

StyledCompenent 방식은 ThemeProvider 아래에서 동작하기 떄문에, 특별히 처리해야 하는 부분들이 있다. 예를들면 사용자가 해당 라이브러리의 설정 그대로 사용하는 경우에는 기본 Theme 을 적용 시켜야 하고, 커스텀을 위해 별도의 ThemeProvider 를 사용
해당 부분은 MUI 의 동작 방식을 뜯어보면서 구현 해 나가야 할 듯 하다.