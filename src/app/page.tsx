import { Search } from '@/components/client';
import { Page, PageHeader, Text } from '@/components/server';

export default function Home() {
  return (
    <Page>
      <PageHeader
        heading={
          <Text as="h1" variant="heading-xl" align="center">
            Compare your Air
          </Text>
        }
        text={
          <>
            <Text
              variant="body-lg"
              align="center"
            >{`Compare the air quality between cities in the UK.`}</Text>

            <Text
              variant="body-lg"
              align="center"
            >{`Select cities to compare using the search tool below.`}</Text>
          </>
        }
      />

      <Search />
    </Page>
  );
}
